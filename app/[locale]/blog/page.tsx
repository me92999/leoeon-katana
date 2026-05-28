export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const articles = [
    { date: t("article1Date"), title: t("article1Title"), excerpt: t("article1Excerpt") },
    { date: t("article2Date"), title: t("article2Title"), excerpt: t("article2Excerpt") },
    { date: t("article3Date"), title: t("article3Title"), excerpt: t("article3Excerpt") },
    { date: t("article4Date"), title: t("article4Title"), excerpt: t("article4Excerpt") },
  ];

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            {t("title")}
          </h1>
          <div className="space-y-8 text-text-secondary leading-relaxed text-sm">
            {articles.map((a, i) => (
              <article key={i} className="border border-dark-border bg-dark-surface p-6">
                <span className="text-xs text-text-muted">{a.date}</span>
                <h2 className="text-gold text-lg font-medium mt-2 mb-3">{a.title}</h2>
                <p>{a.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
