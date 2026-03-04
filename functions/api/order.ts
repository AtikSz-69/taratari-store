// Type definitions for Cloudflare Pages Functions environment
interface Env {
    DB: D1Database;
}

interface OrderRequest {
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    items_json: string;
    total_amount: number;
}

// POST /api/order — Save a customer order to D1
export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = (await context.request.json()) as OrderRequest;

        // Validate required fields
        if (!body.customer_name || !body.customer_phone || !body.customer_address || !body.items_json || !body.total_amount) {
            return new Response(
                JSON.stringify({ success: false, error: 'Missing required fields: customer_name, customer_phone, customer_address, items_json, total_amount' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate phone number (Bangladeshi format)
        const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
        if (!phoneRegex.test(body.customer_phone.replace(/[\s-]/g, ''))) {
            return new Response(
                JSON.stringify({ success: false, error: 'Invalid phone number format' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await context.env.DB.prepare(
            'INSERT INTO orders (customer_name, customer_phone, customer_address, items_json, total_amount) VALUES (?, ?, ?, ?, ?)'
        ).bind(body.customer_name, body.customer_phone, body.customer_address, body.items_json, body.total_amount).run();

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Order placed successfully!',
                orderId: result.meta.last_row_id,
                total: body.total_amount,
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
