import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Partners: Major" };

export default function PartnersPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px 100px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
          Partners
        </h1>
        <p style={{ fontSize: 12, color: "var(--grey-hover)", marginBottom: 24, lineHeight: 1.8 }}>
          {/* PLACEHOLDER: add your partners content here */}
          Add your partners content here.
        </p>
        <a href="/contact" className="btn-major" style={{ textDecoration: "none", display: "inline-block" }}>
          Contact Us
        </a>
      </main>
      <Footer />
    </div>
  );
}
