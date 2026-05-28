"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Star, ArrowLeft, Check, Shield, Truck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Product } from "../../../data/products";
import ProductActions from "../../../components/ProductActions";
import ProductGallery from "../../../components/ProductGallery";
import ComplianceNotice from "../../../components/ComplianceNotice";

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

export default function ProductDetailContent({
  initialProduct,
  locale,
}: {
  initialProduct: Product;
  locale: string;
}) {
  const t = useTranslations();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const all = data.map(transformApiProduct);
          const found = all.find((p) => p.slug === initialProduct.slug);
          if (found) setProduct(found);
          setRelated(
            all
              .filter((p) => p.category === initialProduct.category && p.id !== initialProduct.id)
              .slice(0, 4)
          );
        }
      })
      .catch(() => {});
  }, [initialProduct.slug, initialProduct.category]);

  const productImages = [
    product.image,
    ...(product.gallery || []).map((g) => g.url),
  ].filter(Boolean);

  return (
    <main className="pt-20 bg-dark min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("product.backToCollection")}
        </Link>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            {product.tag && (
              <span
                className={`absolute top-4 left-4 z-10 px-3 py-1 ${product.tagColor || "bg-gold"} text-[10px] text-white tracking-wider font-medium`}
              >
                {product.tag}
              </span>
            )}
            <ProductGallery
              mainImage={product.image}
              imageAlt={product.imageAlt}
              gallery={product.gallery}
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <p className="text-xs text-gold tracking-[0.2em]">{product.category}</p>
            <h1 className="font-[family-name:var(--font-cinzel)] text-3xl lg:text-4xl font-bold tracking-wide">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm text-text-primary font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="text-text-muted text-sm">
                ({product.reviews} {t("product.reviews")})
              </span>
              <span className="w-px h-4 bg-dark-border" />
              <span
                className={`text-xs tracking-wider ${
                  product.inStock ? "text-green-400" : "text-text-muted"
                }`}
              >
                {product.inStock ? t("product.inStock") : t("product.outOfStock")}
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold text-gold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-text-muted line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed">
              {product.description || t("product.noDescription")}
            </p>

            {/* Specs */}
            {product.specs && (
              <div className="border border-dark-border bg-dark-surface p-5 space-y-3">
                <h3 className="text-xs tracking-[0.2em] text-gold font-medium">
                  {t("product.specifications")}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-text-muted block">{t("product.bladeLength")}</span>
                    <span className="text-text-primary">{product.specs.bladeLength}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">{t("product.overallLength")}</span>
                    <span className="text-text-primary">{product.specs.overallLength}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">{t("product.weight")}</span>
                    <span className="text-text-primary">{product.specs.weight}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">{t("product.material")}</span>
                    <span className="text-text-primary">{product.specs.material}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-text-muted block">{t("product.handle")}</span>
                    <span className="text-text-primary">{product.specs.handle}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <ProductActions product={product} />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: Check, text: t("product.lifetimeWarranty") },
                { icon: Truck, text: t("product.freeShipping") },
                { icon: Shield, text: t("product.securePayment") },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-2 py-3 border border-dark-border text-center"
                >
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="text-[10px] text-text-muted tracking-wider">{text}</span>
                </div>
              ))}
            </div>

            <ComplianceNotice locale={locale} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold tracking-wide text-center mb-10">
              {t("product.youMayAlsoLike")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}/`}
                  className="group bg-dark-surface border border-dark-border hover:border-gold/30 transition-all"
                >
                  <div className="aspect-[4/5] bg-dark-elevated flex items-center justify-center overflow-hidden">
                    {p.image && p.image !== "/images/products/placeholder.jpg" ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-1.5 h-32 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full rotate-12" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-gold tracking-[0.2em] mb-1">{p.category}</p>
                    <h3 className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-lg font-semibold text-gold mt-2">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
