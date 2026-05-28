export const dynamic = "force-static";

import PaymentClient from "./PaymentClient";

export default async function PaymentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PaymentClient locale={locale} />;
}
