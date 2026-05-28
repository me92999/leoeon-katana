export const dynamic = "force-static";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            TERMS OF SERVICE
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">1. Introduction</h2>
              <p>Welcome to WOLFKATANA. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before placing an order.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">2. Age Restriction</h2>
              <p>You must be at least 18 years of age to purchase products from our store. By placing an order, you confirm that you meet this requirement and understand the laws regarding the possession of bladed items in your jurisdiction.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">3. Product Descriptions</h2>
              <p>We strive to ensure all product descriptions, images, and specifications are accurate. However, slight variations may occur due to the handmade nature of our products. Colors may appear differently depending on your display settings.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">4. Pricing</h2>
              <p>All prices are listed in USD unless otherwise stated. We reserve the right to modify prices at any time without prior notice. Discounts and promotional offers are valid for a limited time only.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">5. Order Acceptance</h2>
              <p>Your order constitutes an offer to purchase our products. We reserve the right to accept or decline any order for any reason, including but not limited to product availability, errors in pricing or product descriptions, or suspected fraudulent activity.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">6. Shipping & Delivery</h2>
              <p>Shipping times are estimates and not guaranteed. Delivery times may vary depending on your location, customs processing, and carrier delays. We are not responsible for delays caused by customs inspections.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">7. Limitation of Liability</h2>
              <p>WOLFKATANA shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the amount paid for the product in question.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">8. Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction where WOLFKATANA operates, without regard to its conflict of law provisions.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to update or modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the revised terms.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
