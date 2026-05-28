import { Client } from "@notionhq/client";
import { products as localProducts, Product } from "../app/data/products";
import fs from "fs";
import path from "path";

let notion: any = null;

try {
  if (process.env.NOTION_TOKEN) {
    notion = new Client({ auth: process.env.NOTION_TOKEN });
  }
} catch {
  notion = null;
}

const DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

function loadDbProducts(): Product[] | null {
  try {
    const jsonPath = path.join(process.cwd(), "app", "data", "products-db.json");
    if (!fs.existsSync(jsonPath)) return null;
    const raw = fs.readFileSync(jsonPath, "utf8");
    return JSON.parse(raw) as Product[];
  } catch {
    return null;
  }
}

function getSelect(prop: any): string {
  return prop?.select?.name || "";
}

function getTitle(prop: any): string {
  return prop?.title?.[0]?.plain_text || "";
}

function getRichText(prop: any): string {
  return prop?.rich_text?.[0]?.plain_text || "";
}

function getNumber(prop: any): number | null {
  return prop?.number ?? null;
}

function getCheckbox(prop: any): boolean {
  return prop?.checkbox ?? true;
}

function getFiles(prop: any): string {
  const files = prop?.files;
  if (!files || files.length === 0) return "";
  const first = files[0];
  return first?.external?.url || first?.file?.url || "";
}

export async function fetchProductsFromNotion(): Promise<Product[]> {
  const dbProducts = loadDbProducts();
  if (dbProducts) {
    console.log("[DB] Using synced D1 products:", dbProducts.length);
    return dbProducts;
  }

  if (!notion || !DATABASE_ID) {
    console.log("[Notion] No token or DB ID, using local products");
    return localProducts;
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "In Stock",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Created time",
          direction: "descending",
        },
      ],
    });

    const items: Product[] = response.results.map((page: any) => {
      const p = page.properties;
      return {
        id: page.number ?? parseInt(page.id.replace(/\D/g, "").slice(0, 6)),
        name: getTitle(p.Name),
        category: getSelect(p.Category) || "AUTHENTIC",
        price: getNumber(p.Price) ?? 0,
        originalPrice: getNumber(p["Original Price"]),
        rating: getNumber(p.Rating) ?? 5.0,
        reviews: getNumber(p.Reviews) ?? 0,
        tag: getSelect(p.Tag) || null,
        tagColor: getSelect(p["Tag Color"]) || null,
        image: getFiles(p.Image) || "/images/products/placeholder.jpg",
        slug: getRichText(p.Slug) || getTitle(p.Name).toLowerCase().replace(/\s+/g, "-"),
        inStock: getCheckbox(p["In Stock"]),
        description: getRichText(p.Description) || "",
        specs: {
          bladeLength: getRichText(p["Blade Length"]) || "",
          overallLength: getRichText(p["Overall Length"]) || "",
          weight: getRichText(p.Weight) || "",
          material: getRichText(p.Material) || "",
          handle: getRichText(p.Handle) || "",
        },
      };
    });

    if (items.length === 0) {
      console.log("[Notion] No products found in DB, fallback to local");
      return localProducts;
    }

    return items;
  } catch (error) {
    console.error("[Notion] Fetch failed, using local products:", error);
    return localProducts;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchProductsFromNotion();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  const decoded = decodeURIComponent(slug);
  return all.find((p) => p.slug === decoded || p.slug === slug) || null;
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await getAllProducts();
  return all.map((p) => p.slug);
}
