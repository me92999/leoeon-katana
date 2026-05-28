export const dynamic = "force-static";

import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            {t("title")}
          </h1>
          <div className="space-y-8 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("getInTouch")}</h2>
              <p>{t("getInTouchDesc")}</p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-dark-border bg-dark-surface p-5">
                <Mail className="w-5 h-5 text-gold mb-3" />
                <h3 className="text-text-primary font-medium mb-1">{t("email")}</h3>
                <p>support@wolfkatana.com</p>
              </div>
              <div className="border border-dark-border bg-dark-surface p-5">
                <Phone className="w-5 h-5 text-gold mb-3" />
                <h3 className="text-text-primary font-medium mb-1">{t("phone")}</h3>
                <p>+1 (888) 555-KATA</p>
              </div>
              <div className="border border-dark-border bg-dark-surface p-5">
                <MapPin className="w-5 h-5 text-gold mb-3" />
                <h3 className="text-text-primary font-medium mb-1">{t("address")}</h3>
                <p>Osaka, Japan & Los Angeles, CA</p>
              </div>
              <div className="border border-dark-border bg-dark-surface p-5">
                <Clock className="w-5 h-5 text-gold mb-3" />
                <h3 className="text-text-primary font-medium mb-1">{t("hours")}</h3>
                <p>{t("hoursValue")}</p>
              </div>
            </div>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("responseTime")}</h2>
              <p>{t("responseTimeDesc")}</p>
            </section>

            <section>
              <h2 className="text-gold text-lg font-medium mb-3">{t("wholesale")}</h2>
              <p>{t("wholesaleDesc")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
