"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const brands = [
  { name: "BUSHIDO", sub: "EST. 1987" },
  { name: "KATANAKAJI", sub: "MASTER CRAFT" },
  { name: "TAMAHAGANE", sub: "PREMIUM STEEL" },
  { name: "SHINOBU", sub: "TRADITIONAL" },
  { name: "MURAMASA", sub: "LEGENDARY" },
  { name: "MASAMUNE", sub: "HERITAGE" },
];

export default function LogoBar({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <section className="py-16 bg-dark-surface border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-text-muted text-xs tracking-[0.3em] mb-10"
        >
          {t("logobar.trusted")}
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <div className="font-[family-name:var(--font-cinzel)] text-lg text-text-muted group-hover:text-gold transition-colors duration-300 tracking-wider">
                {brand.name}
              </div>
              <div className="text-[10px] text-dark-border group-hover:text-gold/60 transition-colors duration-300 tracking-[0.2em] mt-1">
                {brand.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
