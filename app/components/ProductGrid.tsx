"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Eye, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "../data/products";
import { Link } from "@/i18n/routing";
import { useCart } from "./CartContext";

const categoryMap: Record<string, string> = {
  ALL: "ALL",
  "ANIME REPLICA": "ANIME",
  "MOVIE REPLICA": "MOVIE",
  AUTHENTIC: "AUTHENTIC",
  ACCESSORY: "ACCESSORIES",
};

function transformApiProduct(row: any): Product {
  return {
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
    gallery: row.gallery ? JSON.parse(row.gallery) : [],
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
  };
}

export default function ProductGrid({
  locale,
  initialProducts,
}: {
  locale: string;
  initialProducts: Product[];
}) {
  const t = useTranslations();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data.map(transformApiProduct));
        }
      })
      .catch(() => {});
  }, []);

  const filters = [
    { key: "ALL", label: t("products.filterAll") },
    { key: "ANIME REPLICA", label: t("products.filterAnime") },
    { key: "MOVIE REPLICA", label: t("products.filterMovie") },
    { key: "AUTHENTIC", label: t("products.filterAuthentic") },
    { key: "ACCESSORY", label: t("products.filterAccessories") },
  ];

  const filteredProducts = useMemo(() => {
    if (activeFilter === "ALL") return products;
    return products.filter((p) => p.category === activeFilter);
  }, [activeFilter, products]);

  return (
    <section id="products" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.3em] mb-4">
            <span className="w-8 h-px bg-gold" />
            {t("products.subtitle")}
            <span className="w-8 h-px bg-gold" />
          </span>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl lg:text-4xl font-bold tracking-wide">
            {t("products.title")}
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 text-xs tracking-[0.15em] border transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-gold text-dark border-gold"
                  : "border-dark-border text-text-secondary hover:border-gold hover:text-gold"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-dark-surface border border-dark-border hover:border-gold/30 transition-all duration-500"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {product.tag && (
                <span
                  className={`absolute top-3 left-3 z-10 px-2.5 py-1 ${product.tagColor || "bg-gold"} text-[10px] text-white tracking-wider font-medium`}
                >
                  {product.tag}
                </span>
              )}

              {!product.inStock && (
                <div className="absolute inset-0 z-20 bg-dark/70 flex items-center justify-center">
                  <span className="px-4 py-2 border border-text-muted text-text-muted text-xs tracking-[0.2em]">
                    {t("products.soldOut")}
                  </span>
                </div>
              )}

              <Link href={`/product/${product.slug}/`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-dark-elevated flex items-center justify-center">
                  {product.image && product.image !== "/images/products/placeholder.jpg" ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className={`w-1.5 h-48 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full shadow-[0_0_40px_rgba(201,169,110,0.2)] transition-all duration-700 ${
                        hoveredId === product.id
                          ? "rotate-6 scale-110 shadow-[0_0_60px_rgba(201,169,110,0.4)]"
                          : "rotate-12"
                      }`}
                    />
                  )}
                  <div
                    className={`absolute inset-0 bg-dark/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
                      hoveredId === product.id && product.inStock ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Link
                      href={`/product/${product.slug}/`}
                      className="w-10 h-10 bg-gold text-dark flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      className="w-10 h-10 bg-dark-surface border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-dark transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                        setJustAddedId(product.id);
                        setTimeout(() => setJustAddedId(null), 1500);
                      }}
                    >
                      {justAddedId === product.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </Link>

              <div className="p-4 space-y-2">
                <p className="text-[10px] text-gold tracking-[0.2em]">
                  {product.category}
                </p>
                <Link href={`/product/${product.slug}/`}>
                  <h3 className="text-sm font-medium text-text-primary leading-snug group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs text-text-secondary">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-semibold text-gold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-muted line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            No products found in this category.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold text-gold text-sm tracking-wider hover:bg-gold hover:text-dark transition-all duration-300"
          >
            {t("products.viewAll")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
