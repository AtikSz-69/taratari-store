// Type definitions for Cloudflare Pages Functions environment
interface Env {
  GEMMA_API_KEY: string;
}

interface GenerateRequest {
  name: string;
  features?: string;
  category?: string;
}

// Exponential backoff helper — retries on 429 Rate Limit errors
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
  baseDelay = 2000
): Promise<Response> {
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    // If not a rate limit error, return immediately
    if (response.status !== 429) {
      return response;
    }

    lastResponse = response;

    // Don't wait after the last attempt
    if (attempt < maxRetries) {
      const delay = baseDelay * Math.pow(2, attempt); // 2s → 4s → 8s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // All retries exhausted — return the last 429 response
  return lastResponse!;
}

// POST /api/gemma-proxy — Proxy to Google AI Studio (Gemini Flash) for product descriptions
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const apiKey = context.env.GEMMA_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'GEMMA_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = (await context.request.json()) as GenerateRequest;

    if (!body.name) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Premium brand system instruction
    const systemInstruction = `You are the Lead Brand Copywriter for "Taratari-store," a high-end e-commerce platform in Bangladesh known for speed and quality.

Your goal is to transform basic product features into "Premium, Must-Have" descriptions.

## Tone & Style Guidelines:
- Tone: Sophisticated, modern, and highly persuasive.
- Language: Primary English, but use culturally relevant context (e.g., mention reliability for Dhaka/Chittagong deliveries or suitability for the local climate/lifestyle).
- Structure: Start with a "Hook" (a bold claim), follow with 3 bulleted "Key Benefits" (not just features), and end with a "Trust Factor" (mentioning Taratari's fast service).

## Formatting Rules:
- Use bolding for emphasis.
- Keep the total length under 150 words.
- Avoid generic phrases like "best product"; instead, use "uncompromising quality" or "precision-engineered."

## Output Example:
[Hook] Elevate your daily routine with the [Product Name]—where luxury meets peak performance.
[Benefits]
* Benefit 1: Detail why this matters for a premium lifestyle.
* Benefit 2: Highlight the durability or unique design.
* Benefit 3: Focus on the user experience.
[Trust] Order now for lightning-fast delivery across Bangladesh, exclusively at Taratari.`;

    // User prompt with product details
    const userPrompt = `Write a premium product description for:

Product Name: ${body.name}
${body.features ? `Key Features: ${body.features}` : ''}
${body.category ? `Category: ${body.category}` : ''}

Follow the structure exactly: Hook → 3 Bulleted Benefits → Trust Factor.
Return ONLY the formatted description, nothing else.`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;
    const requestBody = JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        topP: 0.9,
      },
    });

    // Fetch with automatic retry on 429 (up to 3 retries with exponential backoff)
    const response = await fetchWithRetry(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    if (!response.ok) {
      const errText = await response.text();
      const errorMsg = response.status === 429
        ? 'Rate limit exceeded. Please wait a moment and try again.'
        : `AI API error: ${response.status}`;
      return new Response(
        JSON.stringify({ success: false, error: errorMsg, details: errText }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json() as any;
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return new Response(
        JSON.stringify({ success: false, error: 'No description generated' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, description: text }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to generate description' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

