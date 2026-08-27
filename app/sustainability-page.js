import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Sustainability & Impact: Major" };

export default function Sustainability() {
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
        <h1 style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48 }}>
          Sustainability &amp; Impact
        </h1>
        <div style={{ fontSize: 12, lineHeight: 1.9, letterSpacing: "0.02em", maxWidth: 640, textAlign: "left" }}>
          <p style={{ marginBottom: 24 }}>
            Major reduces waste at the point where it is most preventable, the moment a student is done with something
            another student still needs. Textbooks, lab equipment, dorm furniture, calculators, bikes; materials campuses
            have historically treated as disposable are redirected to the next student who needs them, extending their
            use and reducing what ends up in a landfill.
          </p>
          <p style={{ marginBottom: 24 }}>
            This model operates consistently across every campus we serve, regardless of size, institution type, or
            geography, including study abroad locations like Paris, Milan, and Abu Dhabi. Students studying abroad can
            sell their belongings on their home campus before departure, then buy, rent, or sell again once they arrive,
            resetting the reuse cycle locally instead of requiring them to ship, store, or discard what they own.
          </p>
          <p style={{ marginBottom: 24 }}>
            We work directly with organizations already doing this work at the campus level, including campus
            sustainability offices, student-run donation drives, and move-out waste diversion programs. In California
            alone, Major partners with 150 on-campus organizations to keep this cycle running locally, which is what
            allows our model to function the same way whether it&rsquo;s deployed within a single UC system or across an
            international network of institutions.
          </p>
          <p>
            We measure our impact through platform activity. Every completed buy or sell transaction counts as one item
            diverted from a landfill and kept in circulation. Rental transactions divert waste the same way, keeping a
            single item in use across multiple students instead of being bought once and discarded. Service transactions
            measure economic activity within the student community. When an item can no longer be resold or rented,
            referrals to our on-campus partner organizations route it into donation or e-waste channels instead of the
            trash, with that volume tracked in tons diverted. Each of these has grown consistently since our founding,
            and each is expected to continue growing as our campus and sustainability partnerships expand.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
