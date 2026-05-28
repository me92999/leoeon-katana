interface Env {
  DB: D1Database;
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
  try {
    const row = await context.env.DB.prepare(
      "SELECT value FROM settings WHERE key = ?"
    ).bind("hero_slides").first();

    if (!row) {
      return jsonResponse({ enabled: false, slides: [] });
    }

    try {
      const parsed = JSON.parse(row.value as string);
      return jsonResponse(parsed);
    } catch {
      return jsonResponse({ enabled: false, slides: [] });
    }
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
