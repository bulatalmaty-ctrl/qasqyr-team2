import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405 });
  
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("Missing ID", { status: 400 });
  
  const store = getStore("qasqyr_assets");
  
  try {
    const blob = await store.get(id, { type: 'arrayBuffer' });
    if (!blob) return new Response("Not found", { status: 404 });
    
    let contentType = "image/jpeg";
    if (id.endsWith(".png")) contentType = "image/png";
    if (id.endsWith(".gif")) contentType = "image/gif";
    if (id.endsWith(".svg")) contentType = "image/svg+xml";
    if (id.endsWith(".webp")) contentType = "image/webp";
    
    return new Response(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch(e) {
    return new Response("Error fetching image", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/image"
};
