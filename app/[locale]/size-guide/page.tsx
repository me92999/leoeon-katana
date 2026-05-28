export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function SizeGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sizeGuide" });

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
              <h2 className="text-gold text-lg font-medium mb-3">{t("introTitle")}</h2>
              <p>{t("introDesc")}</p>
            </section>

            <div className="border border-dark-border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-dark-surface">
                  <tr>
                    <th className="p-3 text-gold font-medium">{t("tblMeasurement")}</th>
                    <th className="p-3 text-gold font-medium">{t("tblStandard")}</th>
                    <th className="p-3 text-gold font-medium">{t("tblNotes")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {["bladeLength", "overallLength", "handleLength", "bladeWidth", "bladeThickness", "weightNoSaya", "weightWithSaya"].map((key) => (
                    <tr key={key}>
                      <td className="p-3 text-text-primary">{t(`${key}Name`)}</td>
                      <td className="p-3">{t(`${key}Value`)}</td>
                      <td className="p-3">{t(`${key}Note`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("choosingTitle")}</h2>
              <p>{t("choosingDesc")}</p>
            </section>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("miniTitle")}</h2>
              <p>{t("miniDesc")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
