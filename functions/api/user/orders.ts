// Type definitions for Cloudflare Pages Functions environment
interface Env {
  DB: D1Database;
}

// GET /api/user/orders?email=xxx — Fetch orders for a specific user
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch orders where customer matches this email
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC'
    ).bind(email).all();

    return new Response(
      JSON.stringify({ success: true, orders: results || [] }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch orders' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
