export const dynamic = "force-static";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function ShippingPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            SHIPPING & IMPORT POLICY
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Shipping Methods</h2>
              <p>We ship worldwide via DHL, FedEx, and EMS. All orders are carefully packaged in reinforced boxes with foam padding to ensure your sword arrives in perfect condition.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Delivery Times</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>USA & Canada: 7-14 business days</li>
                <li>Europe: 10-18 business days</li>
                <li>Australia & New Zealand: 10-16 business days</li>
                <li>Asia: 7-12 business days</li>
                <li>Rest of World: 14-25 business days</li>
              </ul>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Free Shipping</h2>
              <p>Free standard shipping on all orders over $200 USD. Orders under $200 have a flat shipping rate of $25 USD.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Customs & Import Duties</h2>
              <p>Customers are responsible for any customs duties, import taxes, or fees imposed by their country. These charges vary by destination and are not included in the product price or shipping cost.</p>
              <p className="mt-2">Please verify your local regulations regarding the import of bladed items before placing an order. We are not responsible for items seized by customs authorities.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Restricted Countries</h2>
              <p>Due to local laws and shipping restrictions, we cannot deliver to certain countries. Please contact us before ordering if you are unsure about your country's regulations.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Tracking</h2>
              <p>Once your order ships, you will receive an email with a tracking number. You can use this number to monitor your shipment on the carrier's website.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
