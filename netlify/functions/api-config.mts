import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let siteConfig = await store.get("config", { type: 'json' });
    if (!siteConfig) {
      siteConfig = { 
        hero_title: "ҚАСҚЫР TEAM",
        hero_subtitle: "Стая не знает слова \"сдаться\"", 
        ironman_date: "2026-10-18T00:00:00Z",
        swim_km: 12.5,
        bike_km: 342,
        run_km: 68
      };
      await store.setJSON("config", siteConfig);
    }
    return new Response(JSON.stringify(siteConfig), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const configData = await req.json();
      await store.setJSON("config", configData);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch(e) {
      return new Response("Bad request", { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/config"
};
