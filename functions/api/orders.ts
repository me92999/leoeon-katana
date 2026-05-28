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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestGet(context: { env: Env; request: Request }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const url = new URL(context.request.url);
    const status = url.searchParams.get("status");

    let sql = "SELECT id, email, name, total, status, tracking_number, created_at FROM orders ORDER BY created_at DESC";
    let params: any[] = [];

    if (status) {
      sql = "SELECT id, email, name, total, status, tracking_number, created_at FROM orders WHERE status = ? ORDER BY created_at DESC";
      params = [status];
    }

    const { results } = await context.env.DB.prepare(sql).bind(...params).all();
    return jsonResponse(results);
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
