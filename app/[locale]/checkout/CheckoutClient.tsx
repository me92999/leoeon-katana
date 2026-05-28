"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "../../components/CartContext";
import { Link } from "@/i18n/routing";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowLeft, Package, ArrowRight } from "lucide-react";

export default function CheckoutClient({ locale }: { locale: string }) {
  const { items, totalPrice } = useCart();
  const t = useTranslations("checkout");
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    notes: "",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wolfkatana-checkout-data");
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem("wolfkatana-checkout-data", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const canProceed =
    form.email && form.name && form.address && form.city && form.country && form.postal_code;

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToStore")}
          </Link>

          {items.length === 0 ? (
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
                      <span className="text-text-primary">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-dark-border mt-4 pt-4 flex justify-between">
                  <span className="text-text-primary font-bold">{t("total")}</span>
                  <span className="text-gold font-bold text-xl">${totalPrice}</span>
                </div>
              </div>

              {/* Form */}
              <div className="border border-dark-border bg-dark-surface p-6 space-y-4">
                <h3 className="text-xs tracking-[0.2em] text-gold font-medium">
                  {t("contactInfo")}
                </h3>
                <div>
                  <label className="block text-xs text-text-muted mb-1.5">
                    {t("email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                    placeholder={t("emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1.5">
                    {t("fullName")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                    placeholder={t("namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1.5">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                    placeholder={t("phonePlaceholder")}
                  />
                </div>

                <div className="border-t border-dark-border pt-4 mt-2">
                  <h3 className="text-xs tracking-[0.2em] text-gold font-medium mb-4">
                    {t("shippingAddress")}
                  </h3>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">
                      {t("address")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                      placeholder={t("addressPlaceholder")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5">
                        {t("city")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                        placeholder={t("cityPlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5">
                        {t("postalCode")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.postal_code}
                        onChange={(e) => handleChange("postal_code", e.target.value)}
                        className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                        placeholder={t("postalCodePlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs text-text-muted mb-1.5">
                      {t("country")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none"
                      placeholder={t("countryPlaceholder")}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs text-text-muted mb-1.5">
                      {t("orderNotes")}
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="w-full bg-dark border border-dark-border px-4 py-3 text-text-primary text-sm focus:border-gold focus:outline-none min-h-[80px] resize-y"
                      placeholder={t("notesPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6">
                <Link
                  href="/payment/"
                  onClick={(e) => {
                    if (!canProceed) {
                      e.preventDefault();
                      alert(t("fillRequired"));
                    }
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-4 font-semibold text-sm tracking-wider transition-colors ${
                    canProceed
                      ? "bg-gold text-dark hover:bg-gold-light"
                      : "bg-dark-surface text-text-muted border border-dark-border cursor-not-allowed"
                  }`}
                >
                  {t("proceedToPayment")} <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[10px] text-text-muted text-center mt-3">
                  {t("taxNote")}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
