import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SellerReviews from "@/components/SellerReviews";
import SellerAvatar from "@/components/SellerAvatar";
import { getSellerById, getReviewsForSeller } from "@/lib/mockSellers";
import { getListingsBySeller } from "@/lib/listings";

async function getRealSeller(id) {
  const snap = await getDoc(doc(db, "users", id));
  return snap.exists() ? snap.data() : null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const seller = await getRealSeller(id);
  return { title: seller ? `${seller.username || seller.name}: Major` : "Seller: Major" };
}

export default async function SellerProfilePage({ params }) {
  const { id } = await params;
  const seller = await getRealSeller(id);
  if (!seller) notFound();

  // Trust stats (rating, sales count, joined date) still come from the mock
  // trust table for now, since real order/review aggregation doesn't exist yet.
  const trust = getSellerById(id);
  const reviews = getReviewsForSeller(id);
  const listings = await getListingsBySeller(id);

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 800, margin: "50px auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <SellerAvatar photoURL={seller.photoURL} name={seller.username || seller.name} size={56} />
          <div>
            <h1 style={{ fontSize: 18, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {seller.username || seller.name}
            </h1>
            <p style={{ fontSize: 11, color: "var(--grey-hover)", marginTop: 6 }}>
              {seller.campus}{trust && ` · Joined ${trust.joined}`}
            </p>
            {trust && (
              <p style={{ fontSize: 11, marginTop: 6 }}>
                ★ {trust.rating} &middot; {trust.salesCount} sales
              </p>
            )}
          </div>
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

        <SellerReviews sellerId={id} seedReviews={reviews} />
      </main>

      <Footer />
    </div>
  );
}
