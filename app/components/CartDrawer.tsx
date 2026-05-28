"use client";

import { useCart } from "./CartContext";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const t = useTranslations("cart");

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-surface border-l border-dark-border z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="text-lg font-bold text-text-primary">{t("title")}</h2>
              <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">{totalItems}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-text-muted">
                <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-sm">{t("empty")}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-gold text-sm hover:underline"
                >
                  {t("continueShopping")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 border border-dark-border bg-dark-elevated"
                  >
                    <div className="w-20 h-24 bg-dark flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.product.image && item.product.image !== "/images/products/placeholder.jpg" ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-1 h-12 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full rotate-12" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}/`}
                        className="text-sm font-medium text-text-primary hover:text-gold transition-colors line-clamp-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-text-muted mt-0.5">{item.product.category}</p>
                      <p className="text-gold font-semibold mt-1">${item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-dark-border text-text-muted hover:border-gold hover:text-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm text-text-primary w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-dark-border text-text-muted hover:border-gold hover:text-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-text-muted hover:text-crimson transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-text-muted hover:text-crimson transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> {t("clearAll")}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-dark-border px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">{t("subtotal")}</span>
                <span className="text-text-primary font-semibold">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">{t("shipping")}</span>
                <span className="text-green-400 text-xs">{t("freeOver")}</span>
              </div>
              <div className="border-t border-dark-border pt-3 flex justify-between">
                <span className="text-text-primary font-bold">{t("total")}</span>
                <span className="text-gold font-bold text-xl">${totalPrice}</span>
              </div>
              <Link
                href="/checkout/"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors"
              >
                {t("checkout")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-text-muted text-center">
                {t("taxNote")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
