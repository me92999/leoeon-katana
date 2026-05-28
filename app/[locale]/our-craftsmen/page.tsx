export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function CraftsmenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "craftsmen" });

  const steps = ["smelting", "folding", "shaping", "tempering", "polishing", "mounting"];

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
              <h2 className="text-gold text-lg font-medium mb-3">{t("masterSmithsTitle")}</h2>
              <p>{t("masterSmithsDesc")}</p>
            </section>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("processTitle")}</h2>
              <p>{t("processDesc")}</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                {steps.map((s) => (
                  <li key={s}>
                    <strong className="text-text-primary">{t(`${s}Title`)}:</strong> {t(`${s}Desc`)}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("replicaTitle")}</h2>
              <p>{t("replicaDesc")}</p>
            </section>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("qualityTitle")}</h2>
              <p>{t("qualityDesc")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
