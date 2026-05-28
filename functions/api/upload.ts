import { requireAuth } from "../utils/auth";

interface Env {
  IMAGES: R2Bucket;
  ADMIN_SECRET: string;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

const PUBLIC_URL = "https://pub-6e105bae4ec2412aa6f2943c5b2746dc.r2.dev";

export async function onRequestPost(context: { env: Env; request: Request }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;
  try {
    const formData = await context.request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return jsonResponse({ error: "No file provided" }, 400);
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return jsonResponse({ error: "Invalid file type. Only JPG, PNG, WebP allowed." }, 400);
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return jsonResponse({ error: "File too large. Max 5MB." }, 400);
    }

    const prefix = "products";
    const ext = file.name.split(".").pop()?.toLowerCase();
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext || "jpg"}`;
    const key = `${prefix}/${safeName}`;

    await context.env.IMAGES.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type,
      },
    });

    const url = `${PUBLIC_URL}/${key}`;
    return jsonResponse({ success: true, url, key });
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
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
