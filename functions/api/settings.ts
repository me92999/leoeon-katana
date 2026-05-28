import { requireAuth } from "../utils/auth";

interface Env {
  DB: D1Database;
  ADMIN_SECRET: string;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestGet(context: { env: Env; request: Request }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT key, value FROM settings"
    ).all();

    const settings: Record<string, any> = {};
    for (const row of results || []) {
      try {
        settings[row.key as string] = JSON.parse(row.value as string);
      } catch {
        settings[row.key as string] = row.value;
      }
    }

    return jsonResponse(settings);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestPost(context: { env: Env; request: Request }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const body = await context.request.json();

    for (const [key, value] of Object.entries(body)) {
      const valueStr = typeof value === "string" ? value : JSON.stringify(value);
      await context.env.DB.prepare(
        "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
      ).bind(key, valueStr).run();
    }

    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
