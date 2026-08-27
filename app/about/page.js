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
            Major is a platform for buying and selling student essentials at subsidized rates, with sustainable futures in mind.
            Textbooks, lab equipment, game day merch, dorm decor, calculators, bikes, even braids and lashes from students working
            within their own campus community.
          </p>
          <p style={{ marginBottom: 24 }}>
            Anyone who&rsquo;s spent time around a campus knows the pattern. Students scavenge for materials they can&rsquo;t afford,
            fail a quiz because they never got the textbook, then toss all of it in a dumpster the second the quarter ends. It happens
            at art school, it happens at a big state university, it happens everywhere in between. Major treats that as one problem,
            the cost of what students need, and the waste left over once they&rsquo;re done with it.
          </p>
          <p style={{ marginBottom: 24 }}>
            The system was designed to work the same way no matter where you are. We work with partners across Cal States, UC
            campuses, private universities, and community colleges, all pushing toward the same thing: making educational access
            and sustainable living the norm on every campus, not the exception on a few.
          </p>
          <p>
            We&rsquo;ve put in the years on the operations and the partnerships it takes to run something like this properly, and
            that&rsquo;s what campuses and sustainability partners are actually trusting when they work with Major.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
