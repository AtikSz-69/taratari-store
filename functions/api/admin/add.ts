// Type definitions for Cloudflare Pages Functions environment
interface Env {
    DB: D1Database;
    ADMIN_SECRET_KEY: string;
}

interface ProductRequest {
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category?: string;
}

// POST /api/admin/add — Secure route to add products
export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        // Check admin authorization
        const adminKey = context.request.headers.get('x-admin-key');
        if (!adminKey || adminKey !== context.env.ADMIN_SECRET_KEY) {
            return new Response(
                JSON.stringify({ success: false, error: 'Unauthorized: Invalid admin key' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const body = (await context.request.json()) as ProductRequest;

        // Validate required fields
        if (!body.name || !body.price || body.price <= 0) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing required fields: name, price (must be > 0)' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await context.env.DB.prepare(
            'INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)'
        ).bind(
            body.name,
            body.description || '',
            body.price,
            body.image_url || '',
            body.category || 'general'
        ).run();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Product added successfully!',
                productId: result.meta.last_row_id,
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to add product' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
