export const dynamic = "force-static";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header locale={locale} />
      <main className="pt-28 bg-dark min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-bold tracking-wide text-text-primary mb-8">
            PRIVACY POLICY
          </h1>
          <div className="space-y-6 text-text-secondary leading-relaxed text-sm">
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">1. Information We Collect</h2>
              <p>We collect personal information that you voluntarily provide when placing an order, including your name, email address, shipping address, phone number, and payment information. We also collect non-personal information such as browser type, IP address, and pages visited.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">2. How We Use Your Information</h2>
              <p>Your information is used to process orders, communicate with you about your purchase, improve our website, send promotional emails (if opted in), and comply with legal obligations. We do not sell or rent your personal information to third parties.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">3. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. All transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">4. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can disable cookies in your browser settings, but this may affect website functionality.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">5. Third-Party Services</h2>
              <p>We may use third-party services for payment processing, shipping, and analytics. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect it.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.</p>
            </section>
            <section>
              <h2 className="text-gold text-lg font-medium mb-3">7. Data Retention</h2>
              <p>We retain your information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
