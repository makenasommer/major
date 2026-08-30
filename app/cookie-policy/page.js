import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Cookie Policy: Major" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontWeight: 500, marginBottom: 8, letterSpacing: "0.02em", fontSize: 12, textTransform: "uppercase" }}>{title}</p>
      <div style={{ color: "var(--grey-hover)", fontSize: 12 }}>{children}</div>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 120px", lineHeight: 1.8 }}>
        <h1 style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
          Cookie Policy
        </h1>

        <Section title="What Cookies Are">
          Cookies are small text files stored on your device when you use a website or app. They help the site remember who
          you are, keep you logged in, and remember your preferences between visits.
        </Section>

        <Section title="How We Use Them">
          Major uses cookies and similar technologies (like local storage) for essential functions: keeping you signed in,
          remembering items in your cart, and verifying your campus during account setup. We do not use cookies to sell your
          data or share it with third-party advertisers.
        </Section>

        <Section title="Managing Cookies">
          Most browsers let you block or delete cookies through their settings. Blocking essential cookies may prevent parts
          of Major from working correctly, such as staying signed in or completing a purchase.
        </Section>

        <Section title="Your California Privacy Rights">
          If you are a California resident, you may have rights under the California Consumer Privacy Act (CCPA) and the
          California Privacy Rights Act (CPRA), including the right to know what personal information we collect, the right
          to request deletion of your information, and the right to opt out of the sale or sharing of your personal
          information. Major does not sell or share personal information with third parties for advertising purposes.
        </Section>

        <Section title="Questions">
          For questions about this Cookie Policy or how your data is handled, see our{" "}
          <a href="/privacy" style={{ color: "var(--black)", textDecoration: "underline" }}>Privacy Policy</a> or{" "}
          <a href="/contact" style={{ color: "var(--black)", textDecoration: "underline" }}>contact us</a> directly.
        </Section>
      </main>
      <Footer />
    </div>
  );
}
