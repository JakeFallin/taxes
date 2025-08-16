// // Supabase Edge Function: historical-prices
// // Fetches historical crypto price series (mock-friendly, default CoinGecko) for use in logic calculations.
// // Query params:
// // - id: CoinGecko asset id (e.g., 'bitcoin', 'ethereum'). Default: 'ethereum'
// // - vs_currency: fiat currency (e.g., 'nok', 'usd', 'eur'). Default: 'nok'
// // - days: number of days of history (e.g., '1','7','30','90','365','max'). Default: '30'
// // - interval: 'hourly' | 'daily' (CoinGecko supports 'daily' for longer ranges). Default: 'daily'
// // - range_from & range_to: unix timestamps (seconds). If both provided, uses range endpoint instead of days

// // import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// const corsHeaders: Record<string, string> = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "GET, OPTIONS",
// };

// type MarketPoint = { timestamp: number; price?: number; market_cap?: number; total_volume?: number };

// function jsonResponse(body: unknown, init: ResponseInit = {}) {
//   return new Response(JSON.stringify(body), {
//     ...init,
//     headers: {
//       "Content-Type": "application/json",
//       ...corsHeaders,
//       ...(init.headers || {}),
//     },
//   });
// }

// function errorResponse(message: string, status = 400) {
//   return jsonResponse({ error: message }, { status });
// }

// serve(async (req: Request) => {
//   // Handle CORS
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }
//   if (req.method !== "GET") {
//     return errorResponse("Method not allowed", 405);
//   }

//   try {
//     const url = new URL(req.url);
//     const id = (url.searchParams.get("id") || "ethereum").toLowerCase();
//     const vsCurrency = (url.searchParams.get("vs_currency") || "nok").toLowerCase();
//     const days = (url.searchParams.get("days") || "30").toLowerCase();
//     const interval = (url.searchParams.get("interval") || "daily").toLowerCase();
//     const from = url.searchParams.get("range_from");
//     const to = url.searchParams.get("range_to");

//     // Basic allowlist for vs_currency
//     const allowedFiat = new Set(["nok", "usd", "eur", "gbp", "sek", "dkk"]);
//     if (!allowedFiat.has(vsCurrency)) {
//       return errorResponse("Unsupported vs_currency. Try nok, usd, eur, gbp, sek, dkk.", 400);
//     }

//     let coingeckoUrl: string;
//     if (from && to) {
//       // Range endpoint expects UNIX seconds
//       const fromSec = Number(from);
//       const toSec = Number(to);
//       if (!Number.isFinite(fromSec) || !Number.isFinite(toSec) || fromSec <= 0 || toSec <= 0 || toSec <= fromSec) {
//         return errorResponse("Invalid range_from/range_to.", 400);
//       }
//       coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart/range?vs_currency=${encodeURIComponent(vsCurrency)}&from=${fromSec}&to=${toSec}`;
//     } else {
//       // Days endpoint (supports: 1,7,14,30,90,180,365,max)
//       coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart?vs_currency=${encodeURIComponent(vsCurrency)}&days=${encodeURIComponent(days)}&interval=${encodeURIComponent(interval)}`;
//     }

//     const resp = await fetch(coingeckoUrl, { headers: { "Accept": "application/json" } });
//     if (!resp.ok) {
//       const text = await resp.text();
//       return errorResponse(`Upstream error (${resp.status}): ${text}`, resp.status);
//     }
//     const data = await resp.json();
//     // Expected format: { prices: [ [ts_ms, price], ... ], market_caps: [...], total_volumes: [...] }

//     const toPoints = (arr: Array<[number, number]> | undefined, key: keyof Omit<MarketPoint, "timestamp">): Record<number, MarketPoint> => {
//       const out: Record<number, MarketPoint> = {};
//       if (!Array.isArray(arr)) return out;
//       for (const [ts, value] of arr) {
//         const t = Math.floor(ts);
//         if (!out[t]) out[t] = { timestamp: t };
//         out[t][key] = value;
//       }
//       return out;
//     };

//     const priceMap = toPoints(data?.prices, "price");
//     const capMap = toPoints(data?.market_caps, "market_cap");
//     const volMap = toPoints(data?.total_volumes, "total_volume");

//     const merged: MarketPoint[] = [];
//     const seen = new Set<number>([
//       ...Object.keys(priceMap).map(Number),
//       ...Object.keys(capMap).map(Number),
//       ...Object.keys(volMap).map(Number),
//     ]);
//     for (const t of Array.from(seen).sort((a, b) => a - b)) {
//       merged.push({
//         timestamp: t,
//         price: priceMap[t]?.price,
//         market_cap: capMap[t]?.market_cap,
//         total_volume: volMap[t]?.total_volume,
//       });
//     }

//     // Modest caching
//     return jsonResponse(
//       {
//         id,
//         vs_currency: vsCurrency,
//         count: merged.length,
//         points: merged,
//         source: "coingecko",
//       },
//       {
//         headers: {
//           "Cache-Control": "public, max-age=300, s-maxage=300",
//         },
//       },
//     );
//   } catch (err) {
//     console.error("historical-prices error:", err);
//     return errorResponse("Unexpected error", 500);
//   }
// });


