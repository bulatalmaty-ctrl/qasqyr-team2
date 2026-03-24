import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let list = await store.get("training_logs", { type: 'json' });
    if (!list) list = [];
    return new Response(JSON.stringify(list), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST") {
    try {
      const newLog = await req.json();
      let list = await store.get("training_logs", { type: 'json' }) || [];
      newLog.id = Date.now().toString();
      newLog.timestamp = new Date().toISOString();
      list.unshift(newLog); // Newest first
      await store.setJSON("training_logs", list);
      return new Response(JSON.stringify(newLog), {
        headers: { "Content-Type": "application/json" }
      });
    } catch(e) {
      return new Response("Bad request", { status: 400 });
    }
  }

  if (req.method === "DELETE") {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      if (!id) return new Response("Missing ID", { status: 400 });

      let list = await store.get("training_logs", { type: 'json' }) || [];
      list = list.filter((item: any) => item.id !== id);
      await store.setJSON("training_logs", list);
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
  path: "/api/training"
};
