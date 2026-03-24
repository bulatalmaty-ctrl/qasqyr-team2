import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const ext = url.searchParams.get("ext") || "jpg";
  const store = getStore("qasqyr_assets");
  
  try {
    const buffer = await req.arrayBuffer();
    if (buffer.byteLength === 0) return new Response("Empty file", { status: 400 });
    if (buffer.byteLength > 5 * 1024 * 1024) return new Response("File too large", { status: 413 });
    
    const id = `img_${Date.now()}_${Math.random().toString(36).substring(2,9)}.${ext}`;
    
    await store.set(id, buffer);
    
    return new Response(JSON.stringify({ url: `/api/image?id=${id}` }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch(e) {
    return new Response("Upload failed", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/upload"
};
