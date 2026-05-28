import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/notion";
import { locales } from "@/i18n/request";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductDetailContent from "./ProductDetailContent";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const products = await getAllProducts();
  const params: { slug: string; locale: string }[] = [];
  for (const locale of locales) {
    for (const product of products) {
      params.push({ slug: product.slug, locale });
    }
  }
  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productImages = [
    product.image,
    ...(product.gallery || []).map((g) => g.url),
  ].filter(Boolean);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: productImages.length > 0 ? productImages : [product.image],
    description: product.description || "Premium hand-forged katana sword from WOLFKATANA.",
    sku: String(product.id),
    brand: { "@type": "Brand", name: "WOLFKATANA" },
    offers: {
      "@type": "Offer",
      url: `https://wolfkatana.com/${locale}/product/${product.slug}/`,
      priceCurrency: "USD",
      price: String(product.price),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.price >= 200 ? "0" : "25",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: String(product.rating),
          reviewCount: String(product.reviews || 0),
        }
      : undefined,
    category: product.category,
  };

  return (
    <>
      <Header locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <ProductDetailContent initialProduct={product} locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
