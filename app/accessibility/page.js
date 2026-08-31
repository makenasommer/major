import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Accessibility: Major" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontWeight: 500, marginBottom: 8, letterSpacing: "0.02em", fontSize: 12, textTransform: "uppercase" }}>{title}</p>
      <div style={{ color: "var(--grey-hover)", fontSize: 12 }}>{children}</div>
    </div>
  );
}

export default function AccessibilityPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 40px 120px", lineHeight: 1.8 }}>
        <h1 style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
          Our Commitment to Accessibility
        </h1>

     Major is committed to providing a platform that is accessible to the widest possible audience, regardless of technology or ability. We are actively working to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and will continue making improvements toward that standard to ensure inclusiveness for all of our users.
     If you experience any difficulty accessing any part of this platform, please contact us
        </Section>

      

      
      </main>
      <Footer />
    </div>
  );
}
