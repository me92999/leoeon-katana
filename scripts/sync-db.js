const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "../app/data/products-db.json");

const ACCOUNT_ID = "e4d3442ec0897039afa3b513b4d1e89d";
const DATABASE_ID = "e43f032f-5e01-4738-adf8-eea965abb769";
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";

function transformRows(rows) {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    originalPrice: row.original_price,
    rating: row.rating,
    reviews: row.reviews,
    tag: row.tag,
    tagColor: row.tag_color,
    image: row.image,
    imageAlt: row.image_alt,
    gallery: row.gallery ? JSON.parse(row.gallery) : null,
    slug: row.slug,
    inStock: row.in_stock === 1,
    description: row.description,
    specs: row.blade_length
      ? {
          bladeLength: row.blade_length,
          overallLength: row.overall_length,
          weight: row.weight,
          material: row.material,
          handle: row.handle,
        }
      : undefined,
  }));
}

function writeProducts(products) {
  fs.writeFileSync(outPath, JSON.stringify(products, null, 2));
  console.log(`[sync-db] Synced ${products.length} products to ${outPath}`);
}

console.log("[sync-db] Fetching products from D1...");

// Try 1: wrangler CLI (works locally with OAuth login)
try {
  const rawOutput = execSync(
    "npx wrangler d1 execute leoeon-katana-db --remote --command='SELECT * FROM products ORDER BY id' --json",
    { cwd: path.dirname(__dirname), encoding: "utf8" }
  );

  const startIdx = rawOutput.indexOf("[");
  if (startIdx === -1) throw new Error("No JSON found in output");
  const data = JSON.parse(rawOutput.slice(startIdx));
  const rows = data[0]?.results || [];
  writeProducts(transformRows(rows));
  process.exit(0);
} catch (err) {
  console.warn(`[sync-db] Wrangler failed: ${err.message}`);
}

// Try 2: D1 REST API via curl (works in CI with CLOUDFLARE_API_TOKEN env var)
if (API_TOKEN) {
  try {
    const sql = "SELECT * FROM products ORDER BY id";
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
    const rawOutput = execSync(
      `curl -s -X POST "${url}" -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json" -d ${JSON.stringify(JSON.stringify({ sql }))}`,
      { encoding: "utf8" }
    );

    const response = JSON.parse(rawOutput);
    if (!response.success) {
      throw new Error(response.errors?.[0]?.message || "D1 API error");
    }
    const rows = response.result?.[0]?.results || [];
    writeProducts(transformRows(rows));
    process.exit(0);
  } catch (err) {
    console.warn(`[sync-db] D1 API failed: ${err.message}`);
  }
} else {
  console.warn("[sync-db] CLOUDFLARE_API_TOKEN not set, skipping D1 API fallback");
}

// Fallback: use existing local JSON
if (fs.existsSync(outPath)) {
  console.log("[sync-db] Using existing products-db.json");
} else {
  console.error("[sync-db] No existing products-db.json found");
  process.exit(1);
}
