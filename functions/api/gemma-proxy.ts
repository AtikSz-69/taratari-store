// Type definitions for Cloudflare Pages Functions environment
interface Env {
  GEMMA_API_KEY: string;
}

interface GenerateRequest {
  name: string;
  features?: string;
  category?: string;
}

// POST /api/gemma-proxy — Proxy to Google AI Studio (Gemma 4) for product descriptions
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

    const prompt = `You are a professional e-commerce copywriter for a Bangladeshi digital products store called "Taratari". Write a compelling, concise product description (2-3 sentences max) for the following product:

Product Name: ${body.name}
${body.features ? `Key Features: ${body.features}` : ''}
${body.category ? `Category: ${body.category}` : ''}

Requirements:
- Write in English
- Focus on value and benefits for Bangladeshi customers
- Mention instant digital delivery
- Keep it under 150 words
- Make it sound premium and trustworthy
- Do NOT include the product name in the description

Return ONLY the description text, no quotes or formatting.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ success: false, error: `AI API error: ${response.status}`, details: errText }),
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
