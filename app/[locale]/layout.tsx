import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import "../globals.css";
import { CartProvider } from "../components/CartContext";
import ClientShell from "../components/ClientShell";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: "WOLFKATANA - Hand-Forged Katana Swords | Anime & Movie Replicas",
    description:
      "Premium hand-forged katana swords. Anime replicas, movie swords, and authentic Japanese blades. Free global shipping on orders over $200.",
    keywords: "katana, samurai sword, anime sword, demon slayer, one piece, handmade katana, Japanese sword",
    openGraph: {
      title: "WOLFKATANA - Hand-Forged Katana Swords",
      description: "Premium katana swords for collectors and enthusiasts.",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CartProvider>
        <ClientShell>{children}</ClientShell>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
