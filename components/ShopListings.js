"use client";
import ProductCard from "@/components/ProductCard";
import useAuth from "@/lib/AuthContext";

export default function ShopListings({ listings }) {
  const { user, isLoggedIn, isVerified, ready } = useAuth();

  if (!ready) return null;

  const canSeeCampusListings = isLoggedIn && isVerified;
  const visibleListings = canSeeCampusListings
    ? listings.filter((l) => l.campus === user.campus)
    : listings; // logged-out preview — shows everything, unscoped, as a soft nudge to log in

  return (
    <div>
      {!canSeeCampusListings && (
        <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 20 }}>
          <a href="/account/login" style={{ color: "var(--black)", textDecoration: "underline" }}>
            Log in
          </a>{" "}
          to see listings from your campus only. You&rsquo;re currently viewing a preview across all campuses.
        </p>
      )}

      {canSeeCampusListings && (
        <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 20 }}>
          Showing listings from {user.campus}.
        </p>
      )}

      {visibleListings.length === 0 ? (
        <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
          No listings match these filters at {user?.campus || "your campus"} yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 28,
          }}
        >
          {visibleListings.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
