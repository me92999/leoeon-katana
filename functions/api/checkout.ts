interface Env {
  DB: D1Database;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context: { env: Env; request: Request }) {
  try {
    const body = await context.request.json();
    const {
      email,
      name,
      address,
      city,
      country,
      postal_code,
      phone,
      notes,
      items,
      total,
    } = body;

    if (!email || !name || !Array.isArray(items) || items.length === 0 || typeof total !== "number") {
      return jsonResponse({ error: "Invalid order data" }, 400);
    }

    const itemsJson = JSON.stringify(items);

    const result = await context.env.DB.prepare(
      `INSERT INTO orders (email, name, address, city, country, postal_code, phone, items, total, status, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, datetime('now'))
       RETURNING *`
    ).bind(
      email,
      name,
      address ?? null,
      city ?? null,
      country ?? null,
      postal_code ?? null,
      phone ?? null,
      itemsJson,
      total,
      notes ?? null
    ).first();

    return jsonResponse({ success: true, order: result }, 201);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
