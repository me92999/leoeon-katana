"use client";

import { useState } from "react";
import { defaultLocale } from "@/i18n/request";
import { Globe } from "lucide-react";

const localeLabels: Record<string, string> = {
  en: "English",
  zh: "简体中文",
  "zh-Hant": "繁體中文",
  ru: "Русский",
  es: "Español",
  ja: "日本語",
  ko: "한국어",
  it: "Italiano",
  de: "Deutsch",
};

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const currentLocale = locale;
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (targetLocale: string) => {
    if (targetLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const currentPath = window.location.pathname;
    const search = window.location.search;

    // 从当前路径中移除 currentLocale 前缀（如 /en/ 或 /zh/）
    let basePath = currentPath;
    const prefix = `/${currentLocale}`;
    if (basePath === prefix || basePath.startsWith(prefix + "/")) {
      basePath = basePath.slice(prefix.length) || "/";
    }

    // 构建新路径：默认语言无前缀，其他语言加前缀
    const newPath =
      targetLocale === defaultLocale
        ? basePath + search
        : `/${targetLocale}${basePath}${search}`;

    window.location.href = newPath;
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs tracking-wider transition-colors text-text-secondary hover:text-gold"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{currentLocale}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-44 bg-dark-surface border border-dark-border shadow-xl shadow-black/40 z-50 py-1">
            {Object.entries(localeLabels).map(([locale, label]) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  locale === currentLocale
                    ? "text-gold bg-gold/10"
                    : "text-text-secondary hover:text-gold hover:bg-dark-elevated"
                }`}
              >
                <span className="uppercase text-xs text-text-muted w-8 inline-block">
                  {locale}
                </span>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
