import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const STORE_NAME = "qasqyr_data";

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);
  
  if (req.method === "GET") {
    let manualLogs = await store.get("training_logs", { type: 'json' }) || [];
    
    const now = Date.now();
    const lastSyncStr = await store.get("strava_last_sync") || "0";
    const lastSync = parseInt(lastSyncStr);

    let stravaLogs = await store.get("strava_cache", { type: 'json' }) || [];

    // Sync if older than 15 mins (900_000 ms)
    if (now - lastSync > 900_000) {
      const tokenMap = await store.get("strava_tokens", { type: "json" }) || {};
      const team = await store.get("team", { type: "json" }) || [];
      const newStravaLogs: any[] = [];

      for (const athleteId of Object.keys(tokenMap)) {
        let tokenInfo = tokenMap[athleteId];
        
        // Refresh token if expired or about to expire in 5 min
        if (tokenInfo.expires_at < now + 300_000) {
          try {
            const refreshRes = await fetch("https://www.strava.com/oauth/token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                client_id: process.env.STRAVA_CLIENT_ID,
                client_secret: process.env.STRAVA_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: tokenInfo.refresh_token
              })
            });
            if (refreshRes.ok) {
               const freshData = await refreshRes.json();
               tokenInfo.access_token = freshData.access_token;
               tokenInfo.refresh_token = freshData.refresh_token;
               tokenInfo.expires_at = freshData.expires_at * 1000;
               tokenMap[athleteId] = tokenInfo;
               await store.setJSON("strava_tokens", tokenMap);
            } else { continue; }
          } catch(e) { continue; }
        }

        // Fetch recent activities
        try {
          const actsRes = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
            headers: { "Authorization": `Bearer ${tokenInfo.access_token}` }
          });
          if (actsRes.ok) {
             const activities = await actsRes.json();
             const athleteInfo = team.find((m: any) => m.id.toString() === athleteId.toString());
             const athleteName = athleteInfo ? athleteInfo.name : "Участник Стаи";

             for (const act of activities) {
               let type = "Run";
               if (act.type === "Ride" || act.type === "VirtualRide" || act.type === "GravelRide" || act.type === "MountainBikeRide") type = "Bike";
               if (act.type === "Swim") type = "Swim";
               
               const distanceKm = (act.distance / 1000).toFixed(2);
               const hours = Math.floor(act.moving_time / 3600);
               const mins = Math.floor((act.moving_time % 3600) / 60);
               const secs = act.moving_time % 60;
               const timeStr = `${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
               
               newStravaLogs.push({
                 id: `strava_${act.id}`,
                 timestamp: act.start_date,
                 title: act.name,
                 type: type,
                 athlete: athleteName,
                 distance: distanceKm,
                 time: timeStr,
                 isStrava: true
               });
             }
          }
        } catch(e) { }
      }

      stravaLogs = newStravaLogs;
      await store.setJSON("strava_cache", stravaLogs);
      await store.set("strava_last_sync", now.toString());
    }

    const combined = [...manualLogs, ...stravaLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return new Response(JSON.stringify(combined), {
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
