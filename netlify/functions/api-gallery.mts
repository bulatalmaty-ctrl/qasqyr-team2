import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let list = await store.get("gallery", { type: 'json' });
    if (!list || list.length === 0) {
      list = [
        { id: 1, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUokQ0U0IIvYXwmAb_lxsCnnlkeeoa9_bCo8DF2ylQcllXOp0LzaD0j0PTsSoj8U3z1KTbRvZaChjvjhiwm3DByCNoW9kz8qyu16oZVCG3BV_G35NWfaMYLAz55SOc2oG-OG9ugI2SFOSRdWWwm6H-EHr6Xf-L4yL7k_DK6J_sW7lX8guZSWvusd0sPgJWmAV0OdqoP9p1IGgkLQdONY1gMA7hNEhIgLzk9dAGXmMLWPGCCFj0mBvA_81FEbHI6g7OjQ32mk7rx0Y", alt_text: "Gallery Image 1" },
        { id: 2, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm3CsloIKzmOeXhXr2SLhY6PoLXOw09zXUCodlr1WUZBEi6LAKYpBhohVmz3gcclA4wcixlUy2La0a1ldrPmNNZz3dScrBjsL94n_Ui5wMU-ctx4Lv75Crnta7HI8Y5bKYMTgp9tERItzv5yKRPaiR3zbgoJFEGBhyQnmpXV21NbsNsfe-xnyTB-rFBLam3M3wGHuFLR7JTvWJJ-E07MCpoV1mko22pAxDDOXKBxBrKNm4SXX5cW-9PazXRzY2ceDKBr9rfdBquVw", alt_text: "Gallery Image 2" },
        { id: 3, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSWPqJduAW_adYSOOIMXUHCapwMTSsvYic95nXcY-7o0NyQs75cApEEZRZb5U7yi3kA85ySJNtSyIryhLVEyPR42YyYbMX8GsQMat55wN-HNFokb6WnREWalkHx5xoArK3N2YPhldvW-eYQV5IPFsBO3cVmtDq5-qlhq8PsC2FtaJmCAL0VH0n3JiT0qQ9f-M-_ce-kyu53-Tmt2E6aTrjm_0BagBaevHbkBveaAo2pRM45HJeCAsMNWURAOS43DOExJfMl8EkTqo", alt_text: "Gallery Image 3" }
      ];
      await store.setJSON("gallery", list);
    }
    return new Response(JSON.stringify(list), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const galleryList = await req.json();
      await store.setJSON("gallery", galleryList);
      return new Response(JSON.stringify({ success: true, count: galleryList.length }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch(e) {
      return new Response("Bad request", { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/gallery"
};
