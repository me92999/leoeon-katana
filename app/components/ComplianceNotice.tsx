"use client";

import { AlertTriangle, ShieldCheck, Globe, Hammer } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComplianceNotice({ locale }: { locale: string }) {
  const t = useTranslations("compliance");

  return (
    <div className="border border-dark-border bg-dark-surface/50 p-5 space-y-4 mt-6">
      <div className="flex items-center gap-2 text-gold">
        <ShieldCheck className="w-4 h-4" />
        <h3 className="text-xs tracking-[0.2em] font-medium">{t("title")}</h3>
      </div>

      <div className="space-y-3 text-sm text-text-secondary">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <p>
            <strong className="text-text-primary">{t("ageRestriction")}</strong>{" "}
            {t("ageRestrictionText")}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Hammer className="w-4 h-4 text-gold mt-0.5 shrink-0" />
          <p>
            <strong className="text-text-primary">{t("intendedUse")}</strong>{" "}
            {t("intendedUseText")}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Globe className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <p>
            <strong className="text-text-primary">{t("shippingRestrictions")}</strong>{" "}
            {t("shippingRestrictionsText")}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
          <p>
            <strong className="text-text-primary">{t("disclaimer")}</strong>{" "}
            {t("disclaimerText")}
          </p>
        </div>
      </div>
    </div>
  );
}
