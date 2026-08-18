"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";
import { CAMPUS_RESOURCES } from "@/lib/campusResources";

export default function ResourcesPage() {
  const { user, isLoggedIn, isVerified, ready } = useAuth();

  if (!ready) return null;

  const canSee = isLoggedIn && isVerified;
  const resources = canSee ? CAMPUS_RESOURCES[user.campus] : null;

  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px 100px", textAlign: "center" }}>
        <h1 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
          Resources
        </h1>

        <p style={{ fontSize: 12, color: "var(--grey-hover)", lineHeight: 1.8, marginBottom: 36 }}>
          To connect with local donation, e-waste, or move-in/move-out assistance on campus, please connect with
          your on campus organizations.
        </p>

        {!canSee ? (
          <p style={{ fontSize: 12, color: "var(--grey-hover)", lineHeight: 1.8 }}>
            Please login to see your specific campus resources and on campus organizations to assist in
            donations, e-waste, and other applicable sustainability and equity resources.
          </p>
        ) : !resources ? (
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
            Resources for {user.campus} aren&rsquo;t listed yet — check back soon.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "left" }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 6 }}>
                Campus / Reuse / Move-Out
              </p>
              <p style={{ fontSize: 13 }}>{resources.reuse}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 6 }}>
                Local Donation Resources
              </p>
              <p style={{ fontSize: 13 }}>{resources.donation}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 6 }}>
                E-Waste / Specialty
              </p>
              <p style={{ fontSize: 13 }}>{resources.ewaste}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
