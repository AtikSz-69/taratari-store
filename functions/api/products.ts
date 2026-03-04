// Type definitions for Cloudflare Pages Functions environment
interface Env {
    DB: D1Database;
    ADMIN_SECRET_KEY: string;
}

// GET /api/products — Fetch all products from D1
export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { results } = await context.env.DB.prepare(
            'SELECT * FROM products ORDER BY created_at DESC'
        ).all();

        return new Response(JSON.stringify({ success: true, products: results }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to fetch products' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
