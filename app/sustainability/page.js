import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Sustainability & Impact: Major" };

const goals = [
  {
    href: "https://sdgs.un.org/goals/goal4",
    src: "/assets/sdg-04.jpg",
    alt: "Goal 4: Quality Education",
  },
  {
    href: "https://sdgs.un.org/goals/goal10",
    src: "/assets/sdg-10.jpg",
    alt: "Goal 10: Reduced Inequalities",
  },
  {
    href: "https://sdgs.un.org/goals/goal12",
    src: "/assets/sdg-12.png",
    alt: "Goal 12: Responsible Consumption and Production",
  },
];

export default function Sustainability() {
  return (
    <div className="page-fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        .sdg-goal-icon {
          width: 100%;
          height: auto;
          display: block;
          mix-blend-mode: multiply;
          transition: transform 0.25s ease;
          cursor: pointer;
        }
        .sdg-goal-link:hover .sdg-goal-icon,
        .sdg-goal-link:focus-visible .sdg-goal-icon {
          transform: scale(1.08);
        }
      `}</style>
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 80,
          padding: "60px clamp(24px, 8vw, 120px) 80px",
        }}
      >
        <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h1 style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 48 }}>
            Sustainability &amp; Impact
          </h1>

          <img
            src="/assets/sdg-logo.png"
            alt="Sustainable Development Goals"
            style={{ width: 220, height: "auto", marginBottom: 40 }}
          />

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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 56, flex: "0 1 190px" }}>
          {goals.map((goal) => (
            <a
              key={goal.href}
              href={goal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sdg-goal-link"
              style={{ display: "block", width: "100%", maxWidth: 190 }}
            >
              <img src={goal.src} alt={goal.alt} className="sdg-goal-icon" />
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
