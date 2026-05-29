export const dynamic = "force-static";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function ReturnsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            RETURN & REFUND POLICY
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">30-Day Return Guarantee</h2>
              <p>We want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, you may return it within 30 days of delivery for a full refund or exchange.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Return Conditions</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Item must be in original condition with all packaging</li>
                <li>Return must be initiated within 30 days of delivery</li>
                <li>Custom or personalized items cannot be returned</li>
                <li>Item must not show signs of use or damage</li>
              </ul>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">How to Return</h2>
              <p>1. Contact our support team with your order number and reason for return.</p>
              <p>2. We will provide a return shipping label (for defective items) or return address (for change of mind).</p>
              <p>3. Pack the item securely in its original packaging.</p>
              <p>4. Ship the item using a trackable shipping method.</p>
              <p>5. Once received and inspected, we will process your refund within 5-7 business days.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Refund Policy</h2>
              <p>Refunds will be issued to the original payment method. Shipping costs are non-refundable unless the item was defective or incorrect. Please allow 5-10 business days for the refund to appear on your statement.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Damaged or Defective Items</h2>
              <p>If your item arrives damaged or defective, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or full refund at no additional cost to you.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">Lifetime Warranty</h2>
              <p>All CHINESE BLADE category swords come with a lifetime structural warranty against manufacturing defects. This does not cover damage from misuse, accidents, or normal wear and tear.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
