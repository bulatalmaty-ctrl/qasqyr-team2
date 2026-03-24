import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method === "POST") {
    try {
      const { password } = await req.json();
      // Safe fallback if env var is missing during local dev without netlify cli linked
      const adminPassword = process.env.ADMIN_PASSWORD || "qasqyr2026";
      
      if (password === adminPassword) {
        const token = btoa(password + "-admin-token-" + Date.now());
        return new Response(JSON.stringify({ token }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } else {
        return new Response(JSON.stringify({ error: "Invalid password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
    } catch(e) {
      return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
  }
  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/auth"
};
