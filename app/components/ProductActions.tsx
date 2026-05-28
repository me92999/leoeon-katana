"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingBag, Check, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";
import { Link } from "@/i18n/routing";

export default function ProductActions({ product }: { product: any }) {
  const { addToCart } = useCart();
  const t = useTranslations("product");
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (!product.inStock) return;
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-muted">{t("quantity")}</span>
        <div className="flex items-center border border-dark-border">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
          >
            -
          </button>
          <span className="w-10 text-center text-sm text-text-primary">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              {t("added")}
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              {t("addToCart")}
            </>
          )}
        </button>
        <Link
          href="/checkout/"
          onClick={() => {
            if (product.inStock) {
              for (let i = 0; i < qty; i++) addToCart(product);
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gold text-gold text-sm tracking-wider hover:bg-gold hover:text-dark transition-colors text-center"
        >
          {t("buyNow")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
