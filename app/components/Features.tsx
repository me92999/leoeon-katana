"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Hammer, ShieldCheck, Truck, Award, Flame, Gem } from "lucide-react";

export default function Features({ locale }: { locale: string }) {
  const t = useTranslations();

  const features = [
    {
      icon: Hammer,
      title: t("features.handForged"),
      description: t("features.handForgedDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("features.warranty"),
      description: t("features.warrantyDesc"),
    },
    {
      icon: Truck,
      title: t("features.shipping"),
      description: t("features.shippingDesc"),
    },
    {
      icon: Award,
      title: t("features.certified"),
      description: t("features.certifiedDesc"),
    },
    {
      icon: Flame,
      title: t("features.clay"),
      description: t("features.clayDesc"),
    },
    {
      icon: Gem,
      title: t("features.materials"),
      description: t("features.materialsDesc"),
    },
  ];

  return (
    <section id="features" className="py-24 bg-dark-surface relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-3 text-gold text-xs tracking-[0.3em] mb-4">
            <span className="w-8 h-px bg-gold" />
            {t("features.subtitle")}
            <span className="w-8 h-px bg-gold" />
          </span>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl lg:text-4xl font-bold tracking-wide">
            {t("features.title")}
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            {t("features.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 bg-dark border border-dark-border hover:border-gold/30 transition-all duration-500"
            >
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.15em] mb-3 text-text-primary">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
