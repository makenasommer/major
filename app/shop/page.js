import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopListings from "@/components/ShopListings";
import ShopControls from "@/components/ShopControls";
import OfferPopup from "@/components/OfferPopup";
import { getListings } from "@/lib/listings";

export const metadata = {
  title: "Shop: Major",
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const listings = await getListings({
    category: params.category,
    type: params.type,
    condition: params.condition,
    sale: params.sale === "true",
    q: params.q,
    sort: params.sort,
  });

  return (
    <div className="page-fade-in">
      <Header />
      <OfferPopup />

      <main style={{ padding: "20px 36px 60px", display: "flex", gap: 40 }}>
        <Suspense fallback={<div style={{ width: 180, flexShrink: 0 }} />}>
          <ShopControls />
        </Suspense>

        <div style={{ flex: 1 }}>
          {params.q && (
            <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 20 }}>
              Showing results for &ldquo;{params.q}&rdquo;
            </p>
          )}

          <ShopListings listings={listings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
