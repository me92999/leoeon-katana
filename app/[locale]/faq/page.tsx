export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });

  const questions = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
  ];

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            {t("title")}
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            {questions.map((item, i) => (
              <section key={i}>
                <h2 className="text-gold text-lg font-medium mb-3">{item.q}</h2>
                <p>{item.a}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
