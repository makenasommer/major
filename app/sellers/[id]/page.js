import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getSellerById, getReviewsForSeller } from "@/lib/mockSellers";
import { MOCK_LISTINGS } from "@/lib/mockListings";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const seller = getSellerById(id);
  return { title: seller ? `${seller.name} — Major` : "Seller — Major" };
}

export default async function SellerProfilePage({ params }) {
  const { id } = await params;
  const seller = getSellerById(id);
  if (!seller) notFound();

  const reviews = getReviewsForSeller(id);
  const listings = MOCK_LISTINGS.filter((l) => l.seller.id === id);

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 800, margin: "50px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 36 }}>
        <div>
          <h1 style={{ fontSize: 18, textTransform: "uppercase", letterSpacing: "0.04em" }}>{seller.name}</h1>
          <p style={{ fontSize: 11, color: "var(--grey-hover)", marginTop: 6 }}>
            {seller.campus} &middot; Joined {seller.joined}
          </p>
          <p style={{ fontSize: 11, marginTop: 6 }}>
            ★ {seller.rating} &middot; {seller.salesCount} sales
          </p>
          <p style={{ fontSize: 11, color: "var(--grey-hover)", marginTop: 4 }}>{seller.responseRate}</p>
        </div>

        <section>
          <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 16 }}>
            Active Listings
          </h2>
          {listings.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>No active listings right now.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24 }}>
              {listings.map((listing) => (
                <ProductCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 16 }}>
            Reviews
          </h2>
          {reviews.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>No reviews yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 12 }}>
                  <p style={{ fontSize: 11 }}>★ {review.rating} &middot; {review.reviewer}</p>
                  <p style={{ fontSize: 12, color: "var(--grey-hover)", marginTop: 4 }}>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
