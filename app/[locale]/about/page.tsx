export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            {t("title")}
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("storyTitle")}</h2>
              <p>{t("storyP1")}</p>
              <p className="mt-3">{t("storyP2")}</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("missionTitle")}</h2>
              <p>{t("missionP1")}</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("craftTitle")}</h2>
              <p>{t("craftP1")}</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("globalTitle")}</h2>
              <p>{t("globalP1")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
