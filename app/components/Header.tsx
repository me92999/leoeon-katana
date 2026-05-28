"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";
import { Link } from "@/i18n/routing";
import { useCart } from "./CartContext";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("nav.katana"), href: "/#products" },
    { label: t("nav.movie"), href: "/#products" },
    { label: t("nav.anime"), href: "/#products" },
    { label: t("nav.accessories"), href: "/#products" },
    { label: t("nav.about"), href: "/#features" },
    { label: t("nav.faq"), href: "/#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-md border-b border-dark-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-cinzel)] text-lg lg:text-xl xl:text-2xl font-bold tracking-[0.1em] lg:tracking-[0.15em] text-gold hover:text-gold-light transition-colors"
          >
            WOLFKATANA
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href as any}
                className="text-xs tracking-[0.15em] text-text-secondary hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <LocaleSwitcher locale={locale} />
            <button className="text-text-secondary hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="relative text-text-secondary hover:text-gold transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-crimson text-[10px] text-white rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="lg:hidden text-text-secondary hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-dark-surface border-t border-dark-border px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href as any}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm tracking-[0.1em] text-text-secondary hover:text-gold transition-colors border-b border-dark-border last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
    </>
  );
}
