import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy: Major" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontWeight: 500, marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</p>
      <div style={{ color: "var(--grey-hover)", fontSize: 12, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 120px" }}>
        <h1 style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
          Privacy Policy
        </h1>
        <Section title="1. Data We Collect">
          You provide: name, .edu email, university affiliation, phone number, listings, photos, messages, payment details (via
          Stripe), and verification documents when required.
        </Section>
        <Section title="2. How We Use Your Data">
          We use your data to operate the marketplace: verifying your campus affiliation, connecting buyers and sellers, processing
          payments through Stripe, and improving the product over time.
        </Section>
        <Section title="3. What We Don't Do">
          We don't sell your personal data to third parties, and we don't share your payment details with other users: Stripe
          handles those directly.
        </Section>
        <Section title="4. Data Retention">
          We retain your data as long as your account is active, and for a limited period after closure for legal, security, or
          fraud-prevention purposes.
        </Section>
        <Section title="5. Your Rights">
          You may contact us anytime to access, correct, or delete your data, subject to what we're legally required to retain.
        </Section>
      </main>
      <Footer />
    </div>
  );
}
