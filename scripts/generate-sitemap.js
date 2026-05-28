const fs = require("fs");
const path = require("path");

const BASE_URL = "https://wolfkatana.com";
const LOCALES = ["en", "zh", "zh-Hant", "ru", "es", "ja", "ko", "it", "de"];
const STATIC_PATHS = ["", "checkout", "payment", "privacy", "terms", "shipping-policy", "returns", "about", "contact", "faq", "size-guide", "blog", "our-craftsmen"];

const productsPath = path.join(__dirname, "../app/data/products-db.json");
const products = fs.existsSync(productsPath)
  ? JSON.parse(fs.readFileSync(productsPath, "utf8"))
  : [];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const locale of LOCALES) {
  for (const p of STATIC_PATHS) {
    const loc = p ? `${BASE_URL}/${locale}/${p}/` : `${BASE_URL}/${locale}/`;
    sitemap += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === "" ? "1.0" : "0.6"}</priority>\n  </url>\n`;
  }

  for (const product of products) {
    if (product.slug) {
      const loc = `${BASE_URL}/${locale}/product/${product.slug}/`;
      sitemap += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  }
}

sitemap += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
console.log(`[sitemap] Generated ${LOCALES.length * STATIC_PATHS.length + LOCALES.length * products.length} URLs in public/sitemap.xml`);

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
fs.writeFileSync(path.join(__dirname, "../public/robots.txt"), robots);
console.log("[robots] Generated public/robots.txt");
