"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellerOnboarding from "@/components/SellerOnboarding";
import useAuth from "@/lib/AuthContext";
import useOffers from "@/lib/useOffers";
import { getListingsBySeller } from "@/lib/listings";

export default function SellerDashboardPage() {
  const { isLoggedIn, isVerified, ready, user } = useAuth();
  const { offers, respondToOffer } = useOffers();
  const router = useRouter();
  const [yourListings, setYourListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  useEffect(() => {
    if (ready && !isLoggedIn) router.push("/account/login");
    else if (ready && isLoggedIn && !isVerified) router.push("/account");
  }, [ready, isLoggedIn, isVerified, router]);

  useEffect(() => {
    if (user?.id) {
      getListingsBySeller(user.id).then((listings) => {
        setYourListings(listings);
        setListingsLoading(false);
      });
    }
  }, [user]);

  if (!ready || !isLoggedIn || !isVerified) return null;

  const pendingOffers = offers.filter((o) => o.status === "pending");

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 800, margin: "60px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Seller Dashboard
          </h1>
          <Link href="/sell/new" className="btn-major" style={{ textDecoration: "none" }}>
            + New Listing
          </Link>
        </div>

        <section>
          <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 16 }}>
            Payout Setup
          </h2>
          <SellerOnboarding />
        </section>

        <section style={{ display: "flex", gap: 40 }}>
          <div>
            <p style={{ fontSize: 20 }}>$0.00</p>
            <p style={{ fontSize: 10, color: "var(--grey-hover)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Available Payout
            </p>
          </div>
          <div>
            <p style={{ fontSize: 20 }}>{yourListings.length}</p>
            <p style={{ fontSize: 10, color: "var(--grey-hover)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Active Listings
            </p>
          </div>
          <div>
            <p style={{ fontSize: 20 }}>0</p>
            <p style={{ fontSize: 10, color: "var(--grey-hover)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Pending Orders
            </p>
          </div>
        </section>

        <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>
          Payout figures are placeholders: real numbers populate once Stripe Connect is wired to this dashboard (see spec doc, Payments section).
        </p>

        <section>
          <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 16 }}>
            Pending Offers
          </h2>
          {pendingOffers.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>No pending offers right now.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {pendingOffers.map((offer) => (
                <div
                  key={offer.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    paddingBottom: 12,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 12 }}>{offer.listingName}</p>
                    <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>Offer: ${(offer.amount / 100).toFixed(2)}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="footer-word" onClick={() => respondToOffer(offer.id, "accepted")}>Accept</button>
                    <button className="footer-word" onClick={() => respondToOffer(offer.id, "declined")}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 16 }}>
            Your Listings
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {listingsLoading ? (
              <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Loading your listings...</p>
            ) : yourListings.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
                You haven&rsquo;t created any listings yet.
              </p>
            ) : (
              yourListings.map((listing) => (
                <div
                  key={listing.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    paddingBottom: 12,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 12 }}>{listing.name}</p>
                    <p style={{ fontSize: 10, color: "var(--grey-hover)" }}>
                      ${(listing.price / 100).toFixed(2)}{listing.type === "rent" && " / day"}
                    </p>
                  </div>
                  <Link href={`/shop/${listing.id}`} className="footer-word">
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
