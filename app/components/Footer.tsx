"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterConfig {
  brandDesc?: string;
  address?: string;
  email?: string;
  phone?: string;
  sections?: FooterSection[];
}

const defaultFooterLinks: FooterSection[] = [
  {
    title: "footer.shop",
    links: [
      { label: "footer.linkAllKatanas", href: "/#products" },
      { label: "footer.linkMovieSwords", href: "/#products" },
      { label: "footer.linkAnimeSwords", href: "/#products" },
      { label: "footer.linkAccessories", href: "/#products" },
      { label: "footer.linkGiftCards", href: "/#products" },
    ],
  },
  {
    title: "footer.support",
    links: [
      { label: "footer.linkContactUs", href: "/contact/" },
      { label: "footer.linkShippingInfo", href: "/shipping-policy/" },
      { label: "footer.linkReturns", href: "/returns/" },
      { label: "footer.linkFAQ", href: "/faq/" },
      { label: "footer.linkSizeGuide", href: "/size-guide/" },
    ],
  },
  {
    title: "footer.company",
    links: [
      { label: "footer.linkAboutUs", href: "/about/" },
      { label: "footer.linkOurCraftsmen", href: "/our-craftsmen/" },
      { label: "footer.linkBlog", href: "/blog/" },
      { label: "footer.linkPress", href: "#" },
      { label: "footer.linkCareers", href: "#" },
    ],
  },
  {
    title: "footer.legal",
    links: [
      { label: "footer.linkPrivacyPolicy", href: "/privacy/" },
      { label: "footer.linkTermsOfService", href: "/terms/" },
      { label: "footer.linkReturns", href: "/returns/" },
      { label: "footer.linkShipping", href: "/shipping-policy/" },
    ],
  },
];

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();
  const [config, setConfig] = useState<FooterConfig>({});

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => {});
  }, []);

  const brandDesc = config.brandDesc ?? t("footer.brandDesc");
  const address = config.address ?? "Osaka, Japan & Los Angeles, CA";
  const email = config.email ?? "support@wolfkatana.com";
  const phone = config.phone ?? "+1 (888) 555-KATA";
  const sections = config.sections ?? defaultFooterLinks;

  function resolveLabel(label: string) {
    const translated = t(label);
    return translated === label ? label : translated;
  }

  return (
    <footer className="bg-dark-surface border-t border-dark-border">
      <div className="border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-[family-name:var(--font-cinzel)] text-xl tracking-wide mb-2">
                {t("footer.joinTitle")}
              </h3>
              <p className="text-text-secondary text-sm">
                {t("footer.joinDesc")}
              </p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 bg-dark border border-dark-border border-r-0 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <button className="px-6 py-3 bg-gold text-dark text-sm font-semibold tracking-wider hover:bg-gold-light transition-colors whitespace-nowrap">
                {t("footer.subscribe")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link
              href="/"
              className="font-[family-name:var(--font-cinzel)] text-2xl font-bold tracking-[0.2em] text-gold inline-block mb-4"
            >
              WOLFKATANA
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
              {brandDesc}
            </p>
            <div className="space-y-3 text-sm text-text-muted">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>{phone}</span>
              </div>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs tracking-[0.2em] text-gold mb-4 font-medium">
                {resolveLabel(section.title)}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href as any}
                      className="text-sm text-text-secondary hover:text-gold transition-colors"
                    >
                      {resolveLabel(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 WOLFKATANA. {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 border border-dark-border flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
