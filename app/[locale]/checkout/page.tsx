export const dynamic = "force-static";

import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CheckoutClient locale={locale} />;
}
