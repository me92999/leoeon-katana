import { requireAuth } from "../../utils/auth";

interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  ADMIN_SECRET: string;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function onRequestGet(context: { env: Env; params: { id: string } }) {
  try {
    const result = await context.env.DB.prepare(
      "SELECT * FROM products WHERE id = ?"
    ).bind(context.params.id).first();
    if (!result) return jsonResponse({ error: "Not found" }, 404);
    return jsonResponse(result);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/\s+/g, '-');
}

export async function onRequestPut(context: { env: Env; request: Request; params: { id: string } }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const body = await context.request.json();
    const {
      name, category, price, original_price, rating, reviews,
      tag, tag_color, image, image_alt, gallery, slug, in_stock, description,
      blade_length, overall_length, weight, material, handle,
    } = body;

    const galleryJson = gallery ? JSON.stringify(gallery) : null;
    const normalizedSlug = slug ? normalizeSlug(slug) : normalizeSlug(name);

    const result = await context.env.DB.prepare(
      `UPDATE products SET
        name = ?, category = ?, price = ?, original_price = ?, rating = ?, reviews = ?,
        tag = ?, tag_color = ?, image = ?, image_alt = ?, gallery = ?, slug = ?, in_stock = ?, description = ?,
        blade_length = ?, overall_length = ?, weight = ?, material = ?, handle = ?
       WHERE id = ?
       RETURNING *`
    ).bind(
      name, category, price, original_price ?? null, rating ?? 5.0, reviews ?? 0,
      tag ?? null, tag_color ?? null, image ?? "/images/products/placeholder.jpg",
      image_alt ?? null, galleryJson, normalizedSlug, in_stock ? 1 : 0, description ?? null,
      blade_length ?? null, overall_length ?? null, weight ?? null,
      material ?? null, handle ?? null,
      context.params.id
    ).first();

    if (!result) return jsonResponse({ error: "Not found" }, 404);
    return jsonResponse(result);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

function getR2KeyFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    // R2 public URL keys are the pathname without leading slash
    return parsed.pathname.replace(/^\//, '');
  } catch {
    return null;
  }
}

export async function onRequestDelete(context: { env: Env; request: Request; params: { id: string } }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const product = await context.env.DB.prepare("SELECT image, gallery FROM products WHERE id = ?")
      .bind(context.params.id).first() as { image: string | null; gallery: string | null } | null;

    if (product) {
      const keysToDelete: string[] = [];
      if (product.image) {
        const key = getR2KeyFromUrl(product.image);
        if (key) keysToDelete.push(key);
      }
      if (product.gallery) {
        try {
          const gallery = JSON.parse(product.gallery) as { url?: string }[];
          for (const item of gallery) {
            if (item.url) {
              const key = getR2KeyFromUrl(item.url);
              if (key) keysToDelete.push(key);
            }
          }
        } catch { /* ignore malformed gallery */ }
      }
      for (const key of keysToDelete) {
        try {
          await context.env.IMAGES.delete(key);
        } catch { /* ignore deletion errors to ensure product removal succeeds */ }
      }
    }

    await context.env.DB.prepare("DELETE FROM products WHERE id = ?")
      .bind(context.params.id).run();
    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
