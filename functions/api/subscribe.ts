// Type definitions for Cloudflare Pages Functions environment
interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = (await context.request.json()) as { email: string };

        if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), { status: 400 });
        }

        // Catch database constraint violations (duplicate email) gracefully
        try {
            await context.env.DB.prepare('INSERT INTO subscribers (email) VALUES (?)')
                .bind(body.email.toLowerCase().trim())
                .run();
        } catch (e: any) {
            // UNIQUE constraint violation in D1 usually throws an error with "UNIQUE constraint failed"
            if (e.message?.includes('UNIQUE')) {
                return new Response(JSON.stringify({ success: true, message: 'You are already subscribed!' }), { status: 200 });
            }
            throw e;
        }

        return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Could not process subscription' }), { status: 500 });
    }
};
