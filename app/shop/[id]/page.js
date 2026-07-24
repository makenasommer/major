import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailActions from "@/components/ProductDetailActions";
import { getListingById } from "@/lib/mockListings";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = getListingById(id);
  return { title: listing ? `${listing.name} — Major` : "Listing — Major" };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) notFound();

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ padding: "20px 36px 60px", display: "flex", gap: 48, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 420, maxWidth: "100%", aspectRatio: "1 / 1", background: "var(--light-grey)", flexShrink: 0 }}>
          <Image
            src={listing.images[0]}
            alt={listing.name}
            fill
            sizes="420px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
              {listing.name}
            </h1>
            <p style={{ fontSize: 13 }}>
              ${(listing.price / 100).toFixed(2)}
              {listing.type === "rent" && " / day"}
            </p>
          </div>

          <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--grey-hover)" }}>
            {listing.description}
          </p>

          <div style={{ fontSize: 11, color: "var(--grey-hover)" }}>
            Condition: {listing.condition.replace("-", " ")}
          </div>

          <ProductDetailActions listing={listing} />

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16, marginTop: 8 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 8 }}>
              Sold By
            </p>
            <p style={{ fontSize: 12 }}>
              <Link href={`/sellers/${listing.seller.id}`} style={{ color: "var(--black)", textDecoration: "underline" }}>
                {listing.seller.name}
              </Link>
            </p>
            <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>
              ★ {listing.seller.rating} · {listing.seller.salesCount} sales
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
