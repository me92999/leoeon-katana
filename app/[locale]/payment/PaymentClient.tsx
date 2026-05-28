"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "../../components/CartContext";
import { Link } from "@/i18n/routing";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowLeft, Package, Check, CreditCard, Shield, Truck, AlertCircle } from "lucide-react";

export default function PaymentClient({ locale }: { locale: string }) {
  const { items, totalPrice, clearCart } = useCart();
  const t = useTranslations("payment");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [method, setMethod] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);

  const checkoutData = (() => {
    try {
      const raw = localStorage.getItem("wolfkatana-checkout-data");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const handleSubmit = async () => {
    if (!method || !confirmed || !checkoutData) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutData,
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
          payment_method: method,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(String(data.order.id));
        clearCart();
        localStorage.removeItem("wolfkatana-checkout-data");
      }
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { key: "paypal", label: t("paypal"), desc: t("paypalDesc") },
    { key: "creditcard", label: t("creditcard"), desc: t("creditcardDesc") },
    { key: "banktransfer", label: t("banktransfer"), desc: t("banktransferDesc") },
    { key: "crypto", label: t("crypto"), desc: t("cryptoDesc") },
  ];

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Link
            href="/checkout/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToCheckout")}
          </Link>

          {items.length === 0 && !orderId ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h2 className="text-xl font-bold text-text-primary mb-2">{t("emptyCartTitle")}</h2>
              <p className="text-text-muted text-sm mb-6">{t("emptyCartDesc")}</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors"
              >
                {t("continueShopping")}
              </Link>
            </div>
          ) : orderId ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">{t("orderReceived")}</h2>
              <p className="text-text-muted mb-2">{t("orderThankYou")}</p>
              <p className="text-gold text-sm mb-8">{t("orderId", { orderId })}</p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors"
              >
                {t("continueShopping")}
              </Link>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="border border-dark-border bg-dark-surface p-5 mb-8">
                <h3 className="text-xs tracking-[0.2em] text-gold font-medium mb-4">
                  {t("orderSummary")}
                </h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-text-secondary">
                        {item.product.name}{" "}
                        <span className="text-text-muted">x{item.quantity}</span>
                      </span>
                      <span className="text-text-primary">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-dark-border mt-4 pt-4 flex justify-between">
                  <span className="text-text-primary font-bold">{t("total")}</span>
                  <span className="text-gold font-bold text-xl">${totalPrice}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="border border-dark-border bg-dark-surface p-6 space-y-4 mb-6">
                <h3 className="text-xs tracking-[0.2em] text-gold font-medium">
                  {t("selectPayment")}
                </h3>

                {methods.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMethod(m.key)}
                    className={`w-full text-left p-4 border transition-colors ${
                      method === m.key
                        ? "border-gold bg-gold/10"
                        : "border-dark-border hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          method === m.key ? "border-gold" : "border-dark-border"
                        }`}
                      >
                        {method === m.key && <div className="w-2.5 h-2.5 rounded-full bg-gold" />}
                      </div>
                      <div>
                        <p className="text-sm text-text-primary font-medium">{m.label}</p>
                        <p className="text-xs text-text-muted">{m.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 border border-dark-border bg-dark-surface">
                  <Shield className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-sm text-text-primary">{t("secureCheckout")}</p>
                    <p className="text-xs text-text-muted">{t("sslEncryption")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-dark-border bg-dark-surface">
                  <Truck className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-sm text-text-primary">{t("freeShippingOver")}</p>
                    <p className="text-xs text-text-muted">{t("worldwideDelivery")}</p>
                  </div>
                </div>
              </div>

              {/* Age Confirm */}
              <div className="border border-dark-border bg-dark-surface p-4 mb-6">
                <div className="flex items-start gap-2 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    {t.rich("ageConfirm", {
                      terms: (chunks) => (
                        <Link href="/terms/" className="text-gold hover:underline">
                          {chunks}
                        </Link>
                      ),
                      privacy: (chunks) => (
                        <Link href="/privacy/" className="text-gold hover:underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!method || !confirmed || loading}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  t("processing")
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {t("placeOrder")}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
