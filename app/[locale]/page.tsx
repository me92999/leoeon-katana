export const dynamic = "force-static";

import { getAllProducts } from "@/lib/notion";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LogoBar from "../components/LogoBar";
import ProductGrid from "../components/ProductGrid";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allProducts = await getAllProducts();
  const products = allProducts.slice(0, 12);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WOLFKATANA",
    url: "https://wolfkatana.com",
    logo: "https://wolfkatana.com/logo.png",
    sameAs: [
      "https://instagram.com/wolfkatana",
      "https://youtube.com/@wolfkatana",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-888-555-5282",
      contactType: "customer service",
      email: "support@wolfkatana.com",
      areaServed: "US",
      availableLanguage: ["English", "Japanese"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WOLFKATANA - Hand-Forged Katana Swords",
    url: `https://wolfkatana.com/${locale}/`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://wolfkatana.com/${locale}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <TopBar locale={locale} />
      <Header locale={locale} />
      <Hero locale={locale} />
      <LogoBar locale={locale} />
      <ProductGrid locale={locale} initialProducts={products} />
      <Features locale={locale} />
      <FAQ locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
