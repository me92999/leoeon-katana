"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Truck, Shield, Clock, RotateCcw } from "lucide-react";

export default function TopBar({ locale }: { locale: string }) {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);

  const messages = [
    { icon: Truck, text: t("topbar.freeShipping") },
    { icon: Shield, text: t("topbar.warranty") },
    { icon: Clock, text: t("topbar.handForged") },
    { icon: RotateCcw, text: t("topbar.guarantee") },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="bg-dark-surface border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-10 overflow-hidden">
          <div className="flex items-center gap-2 text-xs tracking-widest text-gold animate-fade-in">
            {(() => {
              const Icon = messages[current].icon;
              return <Icon className="w-3.5 h-3.5" />;
            })()}
            <span className="font-medium">{messages[current].text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
