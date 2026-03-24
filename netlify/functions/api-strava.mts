import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const store = getStore("qasqyr_data");

  const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
  const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

  if (pathname.endsWith("/auth")) {
    const athleteId = url.searchParams.get("id");
    if (!athleteId) return new Response("Missing athlete id", { status: 400 });

    const redirectUri = encodeURIComponent(`${url.origin}/api/strava/callback`);
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=activity:read_all&state=${athleteId}`;
    
    return Response.redirect(stravaAuthUrl, 302);
  }

  if (pathname.endsWith("/callback")) {
    const code = url.searchParams.get("code");
    const athleteId = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    if (error === "access_denied") {
      return Response.redirect(`${url.origin}/admin?error=strava_access_denied`, 302);
    }
    if (!code || !athleteId) {
      return new Response("Missing code or state", { status: 400 });
    }

    try {
      const tokenRes = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code"
        })
      });

      if (!tokenRes.ok) throw new Error("Token exchange failed");
      const tokenData = await tokenRes.json();

      let tokenMap = await store.get("strava_tokens", { type: "json" }) || {};
      tokenMap[athleteId] = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: tokenData.expires_at * 1000
      };
      
      await store.setJSON("strava_tokens", tokenMap);

      return Response.redirect(`${url.origin}/admin?strava_success=true&tab=team`, 302);
    } catch(e: any) {
      return new Response("Auth Error: " + e.message, { status: 500 });
    }
  }

  return new Response("Not found", { status: 404 });
};

export const config: Config = {
  path: "/api/strava/*"
};
