import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = { title: "FAQ: Major" };

export default function FAQPage() {
  return (
    <div className="page-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, padding: "60px clamp(24px, 8vw, 120px) 100px" }}>
        <h1 style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48 }}>FAQ</h1>
        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}
