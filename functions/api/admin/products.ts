// Type definitions for Cloudflare Pages Functions environment
interface Env {
  DB: D1Database;
  ADMIN_SECRET_KEY: string;
}

// GET /api/admin/products — Fetch all products for admin (secured)
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
      'SELECT * FROM products ORDER BY created_at DESC'
    ).all();

    return new Response(
      JSON.stringify({ success: true, products: results }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch products' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// DELETE /api/admin/products — Delete a product (secured)
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const adminKey = context.request.headers.get('x-admin-key');
    if (!adminKey || adminKey !== context.env.ADMIN_SECRET_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { id } = (await context.request.json()) as { id: number };
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await context.env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to delete product' }), { status: 500 });
  }
};

// PUT /api/admin/products — Edit a product
export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const adminKey = context.request.headers.get('x-admin-key');
    if (!adminKey || adminKey !== context.env.ADMIN_SECRET_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
    }

    const body = await context.request.json() as any;
    if (!body.id || !body.name || !body.price) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    await context.env.DB.prepare(
      'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category = ? WHERE id = ?'
    ).bind(
      body.name, body.description || '', body.price, body.image_url || '', body.category || 'general', body.id
    ).run();

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Failed to update product' }), { status: 500 });
  }
};
