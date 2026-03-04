// Type definitions for Cloudflare Pages Functions environment
interface Env {
    DB: D1Database;
}

interface OrderRequest {
    name: string;
    phone: string;
    address: string;
    cart: Array<{ id: number; name: string; price: number; quantity: number }>;
}

// POST /api/order — Save a customer order to D1
export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = (await context.request.json()) as OrderRequest;

        // Validate required fields
        if (!body.name || !body.phone || !body.address || !body.cart || body.cart.length === 0) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing required fields: name, phone, address, cart' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate phone number (Bangladeshi format)
        const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
        if (!phoneRegex.test(body.phone.replace(/[\s-]/g, ''))) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid phone number format' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Calculate total
        const total = body.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const result = await context.env.DB.prepare(
            'INSERT INTO orders (customer_name, phone, address, cart_json, total) VALUES (?, ?, ?, ?, ?)'
        ).bind(body.name, body.phone, body.address, JSON.stringify(body.cart), total).run();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Order placed successfully!',
                orderId: result.meta.last_row_id,
                total,
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: 'Failed to place order' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
