export function requireAuth(request: Request, env: { ADMIN_SECRET?: string }) {
  const authHeader = request.headers.get("Authorization");
  const expected = env.ADMIN_SECRET || "wolfkatana-admin-2024";

  if (!authHeader || authHeader !== `Bearer ${expected}`) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
  return null;
}
