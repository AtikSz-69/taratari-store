// Type definitions for Cloudflare Pages Functions environment
interface Env {
  DB: D1Database;
  ADMIN_SECRET_KEY: string;
}

// GET /api/admin/orders — Fetch all orders (secured)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const adminKey = context.request.headers.get('x-admin-key');
    if (!adminKey || adminKey !== context.env.ADMIN_SECRET_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { results } = await context.env.DB.prepare(
      'SELECT * FROM orders ORDER BY created_at DESC'
    ).all();

    return new Response(
      JSON.stringify({ success: true, orders: results }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch orders' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
