"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heroConfig, setHeroConfig] = useState<{ enabled: boolean; slides: { bgImage?: string }[] }>({ enabled: false, slides: [] });

  const slides = [
    {
      subtitle: t("hero.slide1.subtitle"),
      title: t("hero.slide1.title"),
      description: t("hero.slide1.description"),
      cta: t("hero.slide1.cta"),
      from: t("hero.slide1.from"),
    },
    {
      subtitle: t("hero.slide2.subtitle"),
      title: t("hero.slide2.title"),
      description: t("hero.slide2.description"),
      cta: t("hero.slide2.cta"),
      from: t("hero.slide2.from"),
    },
    {
      subtitle: t("hero.slide3.subtitle"),
      title: t("hero.slide3.title"),
      description: t("hero.slide3.description"),
      cta: t("hero.slide3.cta"),
      from: t("hero.slide3.from"),
    },
  ];

  const goTo = (index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.slides)) {
          setHeroConfig({ enabled: !!data.enabled, slides: data.slides });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-dark">
      {/* Background layers */}
      {heroConfig.enabled && heroConfig.slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          {slide.bgImage ? (
            <>
              <img
                src={slide.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-dark/70" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-surface to-dark" />
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
              </div>
            </>
          )}
        </div>
      ))}
      {!heroConfig.enabled && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-surface to-dark" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
          </div>
        </>
      )}

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full pt-20">
          <div className="space-y-6 lg:space-y-8">
            <div
              key={`subtitle-${current}`}
              className="inline-flex items-center gap-3 animate-fade-in-up"
            >
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-xs tracking-[0.3em] font-medium">
                {slides[current].subtitle}
              </span>
            </div>

            <h1
              key={`title-${current}`}
              className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {slides[current].title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-gold" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p
              key={`desc-${current}`}
              className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-lg animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {slides[current].description}
            </p>

            <div
              key={`cta-${current}`}
              className="flex items-center gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#products"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-semibold text-sm tracking-wider hover:bg-gold-light transition-all duration-300"
              >
                {slides[current].cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-text-muted text-xs tracking-wider">
                {slides[current].from}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />
            <div className="relative w-full aspect-square max-w-md flex items-center justify-center">
              <div className="w-2 h-64 bg-gradient-to-b from-gold-light via-gold to-gold-dark rounded-full shadow-[0_0_60px_rgba(201,169,110,0.3)] transform rotate-12" />
              <div className="absolute w-24 h-4 bg-gradient-to-r from-dark-elevated via-dark-surface to-dark-elevated rounded-full shadow-lg transform rotate-12 translate-y-32" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-48 bg-gold/40 blur-sm transform rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6">
        <button
          onClick={prev}
          className="w-12 h-12 border border-dark-border hover:border-gold text-text-muted hover:text-gold flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-500 ${
                i === current
                  ? "w-10 bg-gold"
                  : "w-5 bg-dark-border hover:bg-text-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-12 h-12 border border-dark-border hover:border-gold text-text-muted hover:text-gold flex items-center justify-center transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
