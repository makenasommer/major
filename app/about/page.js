import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "About: Major" };

export default function About() {
  return (
    <div className="page-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "60px clamp(24px, 8vw, 120px) 80px",
        }}
      >
        <h1 style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48 }}>About</h1>
        <div style={{ fontSize: 12, lineHeight: 1.9, letterSpacing: "0.02em", maxWidth: 640, textAlign: "left" }}>
          <p style={{ marginBottom: 24 }}>
            We provide the platform to acquire and sell essentials at subsidized rates with environmental consciousness in mind.
          </p>
          <p style={{ marginBottom: 24 }}>
            Textbooks, lab equipment, game day merch, dorm decor, calculators, bikes, even someone to braid your hair or do your lashes.
            <br />Major started at the end of 2023 as an observation of necessity.
          </p>
          <p style={{ marginBottom: 24, color: "var(--grey-hover)" }}>
            Our founder watched students scavenge for art materials to keep up with their projects. Later, home in Los Angeles, she saw
            some students fail quizzes simply because they could not afford the textbook. She personally bought a plethora of books only
            to read a single chapter. Later she became aware of the millions of tons of waste each year from dorm essentials and these
            books, that many cannot afford, harming our world and student potential.
          </p>
          <p style={{ color: "var(--grey-hover)" }}>
            The need for a campus ecosystem infrastructure was universal, even if the exact material needs or reasons for need differed
            across demographics. So our founder built a singular, transferable infrastructure, a constant for students no matter the campus.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
