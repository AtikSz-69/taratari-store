// Type definitions for Cloudflare Pages Functions environment
interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

interface GoogleTokenInfo {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

// POST /api/auth/google — Verify Google ID token and return user info
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { credential } = (await context.request.json()) as { credential: string };

    if (!credential) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing Google credential token' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the ID token with Google's tokeninfo endpoint
    const verifyResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    if (!verifyResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid Google token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tokenInfo = (await verifyResponse.json()) as GoogleTokenInfo;

    // Verify the token was issued for our app
    if (tokenInfo.sub && tokenInfo.email) {
      const user = {
        id: tokenInfo.sub,
        email: tokenInfo.email,
        name: tokenInfo.name,
        picture: tokenInfo.picture,
        firstName: tokenInfo.given_name || tokenInfo.name?.split(' ')[0] || '',
      };

      return new Response(
        JSON.stringify({ success: true, user }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Token verification failed' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Authentication failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
