import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let events = await store.get("calendar_events", { type: 'json' });
    if (!events) events = [];
    return new Response(JSON.stringify(events), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (req.method === "POST") {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const data = await req.json();
      await store.setJSON("calendar_events", data);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch(e) {
      return new Response("Invalid JSON", { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/api/calendar"
};
