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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function onRequestPost(context: { env: Env; request: Request }) {
  const auth = requireAuth(context.request, context.env);
  if (auth) return auth;

  try {
    const row = await context.env.DB.prepare(
      "SELECT value FROM settings WHERE key = ?"
    ).bind("deploy_hook_url").first();

    const hookUrl = row?.value as string | undefined;

    if (!hookUrl) {
      return jsonResponse({
        error: "Deploy Hook URL 未配置",
        message: "请在后台配置 Deploy Hook URL 后重试。",
      }, 400);
    }

    const res = await fetch(hookUrl, { method: "POST" });

    if (res.ok) {
      return jsonResponse({
        success: true,
        message: "发布任务已触发，约 1-2 分钟后生效。",
      });
    } else {
      const text = await res.text();
      return jsonResponse({
        error: "触发失败",
        message: text || "Deploy Hook 返回错误",
      }, 502);
    }
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
