// Type definitions for Cloudflare Pages Functions environment
interface Env {
  DB: D1Database;
  ADMIN_SECRET_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const adminKey = context.request.headers.get('x-admin-key');
    if (!adminKey || adminKey !== context.env.ADMIN_SECRET_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
    }

    const { results } = await context.env.DB.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all();

    return new Response(JSON.stringify({ success: true, subscribers: results }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch subscribers' }), { status: 500 });
  }
};
