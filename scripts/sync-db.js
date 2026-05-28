const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "../app/data/products-db.json");

console.log("[sync-db] Fetching products from D1...");

try {
  const rawOutput = execSync(
    "npx wrangler d1 execute leoeon-katana-db --remote --command='SELECT * FROM products ORDER BY id' --json",
    { cwd: path.dirname(__dirname), encoding: "utf8" }
  );

  // Find the JSON array start in wrangler output (skip banner)
  const startIdx = rawOutput.indexOf("[");
  if (startIdx === -1) {
    throw new Error("No JSON found in output");
  }
  const data = JSON.parse(rawOutput.slice(startIdx));
  const rows = data[0]?.results || [];

  // Transform D1 rows to Product format
  const products = rows.map((row) => ({
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

  fs.writeFileSync(outPath, JSON.stringify(products, null, 2));
  console.log(`[sync-db] Synced ${products.length} products to ${outPath}`);
} catch (err) {
  console.warn(`[sync-db] Skipped: ${err.message}`);
  if (fs.existsSync(outPath)) {
    console.log("[sync-db] Using existing products-db.json");
  } else {
    console.error("[sync-db] No existing products-db.json found");
    process.exit(1);
  }
}
