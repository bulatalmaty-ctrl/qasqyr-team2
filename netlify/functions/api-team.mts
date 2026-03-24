import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let list = await store.get("team", { type: 'json' });
    if (!list || list.length === 0) {
      list = [
        { 
          id: 1, 
          name: "Арлан Каскыр", 
          role: "Captain / Alpha", 
          image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNtPS0ttnwetXnjuLpvD4s-ub9sJf8kvre3ABdcm9A1YLo2ZtgRPIMTcjKMKcK1OJX60Hricppq-IFHtRfJKVuyDbW3lK151jJ6D4_bV3clwVWp17TN7uoa82dx9qLWNYnCqKQpngUM2Fq8UQ3T68qsUILftQuRWmzf72CkEYWzN-znQH6DLje1BxEV94zYigkaWDWPC3XY8xsp0x9ssgRyaq-d3D_LR3VrYLEaBZce9IAthA_R1v4R85Q8oM8GHglaDhy2M4gMnY", 
          manifesto: "Боль временна, триумф вечен. В этой воде мы — вершина пищевой цепи.", 
          strava_url: "#", 
          stat1_label: "Ironman Readiness", 
          stat1_val: 95 
        },
        { 
          id: 2, 
          name: "Тимур Ветер", 
          role: "Tempo Leader", 
          image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY1q7mMEq96z2z_XcQ_P8slZ65xD_IkTvTVP5uBnf_ziTCbBARpfppcFcjRMvEIvXiZ-9fi68DQDCw6VsUZcESa2WQXBA8SHf5Zr4bt4AX9xcjLxYgwA8_nU7oPk-Xek4sHEn1NTiZy4QpixnbWL2k7hsLol1PnOvs4gTGtvd1tbMiZcmkoljOxHJS8gjfPYYYcf6GjVEPtnmtWoqsNijzGgOf1xt1sziHKkKDWDYcsf3eCjKPmeC3RU6huGyTsfRV5cFsMcmXsIo", 
          manifesto: "Мой пульс — это ритм охоты. Я не чувствую ветра, я и есть ветер.", 
          strava_url: "#", 
          stat1_label: "Cycling Power", 
          stat1_val: 88 
        },
        { 
          id: 3, 
          name: "Диана Сталь", 
          role: "Iron Heart", 
          image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvsxU6BLGJxzMwtdszohXnyWVie3GGKjsF4y_Ojg3Z-9clkH94bED2k8HIszzPqX1IHAsBNpuoCAleVIIvCBMB6xTSbRuqDHWLKsTxRy2Z7QQgBSa-aA969PRKfaP_YFp751Q_ioxCJlngwHafcLsVXjS46KN3j-lq6qQgD7K3YT8bjrmKHcGzfnNN3uBLgxMlNQhQLZgunp-1xoiBTJlSWcHIOFWxNvo13HosjUDfXVkXWSYt24awIURZ8OiNwLGffNJJcBMu1k", 
          manifesto: "Когда ноги отказывают, беги сердцем. Границ не существует.", 
          strava_url: "#", 
          stat1_label: "Running Endurance", 
          stat1_val: 92 
        }
      ];
      await store.setJSON("team", list);
    }
    const tokenMap = await store.get("strava_tokens", { type: "json" }) || {};
    const enhancedList = list.map((m: any) => ({ ...m, stravaConnected: !!tokenMap[m.id] }));

    return new Response(JSON.stringify(enhancedList), {
      headers: { "Content-Type": "application/json" }
    });
  }
  
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const teamList = await req.json();
      await store.setJSON("team", teamList);
      return new Response(JSON.stringify({ success: true, count: teamList.length }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch(e) {
      return new Response("Bad request", { status: 400 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/team"
};
