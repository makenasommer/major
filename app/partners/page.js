import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnersContactForm from "@/components/PartnersContactForm";

export const metadata = { title: "Partners: Major" };

export default function PartnersPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 480, margin: "60px auto", padding: "0 24px 100px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
          Partners
        </h1>
        <p style={{ fontSize: 12, color: "var(--grey-hover)", marginBottom: 32, lineHeight: 1.8 }}>
          To become an official partner or collaborate, please contact us using this form.
        </p>
        <PartnersContactForm />
      </main>
      <Footer />
    </div>
  );
}
