import { requireAuth } from "../../utils/auth";

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
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestGet(context: { env: Env; request: Request; params: { id: string } }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const result = await context.env.DB.prepare(
      "SELECT * FROM orders WHERE id = ?"
    ).bind(context.params.id).first();

    if (!result) return jsonResponse({ error: "Not found" }, 404);
    return jsonResponse(result);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestPut(context: { env: Env; request: Request; params: { id: string } }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const body = await context.request.json();
    const { status, notes, tracking_number } = body;

    const result = await context.env.DB.prepare(
      "UPDATE orders SET status = ?, notes = COALESCE(?, notes), tracking_number = COALESCE(?, tracking_number) WHERE id = ? RETURNING *"
    ).bind(status, notes ?? null, tracking_number ?? null, context.params.id).first();

    if (!result) return jsonResponse({ error: "Not found" }, 404);
    return jsonResponse(result);
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
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
