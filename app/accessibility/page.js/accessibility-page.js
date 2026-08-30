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
          Accessibility
        </h1>

        <Section title="Our Commitment">
          Major is committed to making our platform usable by everyone, including students with disabilities. We're actively
          working to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, and we treat accessibility as an
          ongoing responsibility rather than a one-time fix.
        </Section>

        <Section title="What We're Working On">
          This includes readable color contrast, keyboard navigation for menus and forms, accessible names for buttons and
          form fields, and support for screen readers. As we add new features, we review them against these same standards.
        </Section>

        <Section title="Run Into a Problem?">
          If you experience a barrier using Major, or have feedback on how we can do better, please{" "}
          <a href="/contact" style={{ color: "var(--black)", textDecoration: "underline" }}>contact us</a>. Let us know the
          page, what happened, and what device or assistive technology you were using, if applicable, so we can look into it
          directly.
        </Section>
      </main>
      <Footer />
    </div>
  );
}
