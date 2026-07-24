import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopListings from "@/components/ShopListings";
import ShopControls from "@/components/ShopControls";
import { MOCK_LISTINGS } from "@/lib/mockListings";

export const metadata = {
  title: "Shop — Major",
};

function filterAndSortListings(searchParams) {
  let results = [...MOCK_LISTINGS];

  const { category, type, condition, sale, q, sort } = searchParams;

  if (category) results = results.filter((l) => l.category === category);
  if (type) results = results.filter((l) => l.type === type);
  if (condition) results = results.filter((l) => l.condition === condition);
  if (sale === "true") results = results.filter((l) => l.sale);

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query)
    );
  }

  switch (sort) {
    case "newest":
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "price-low":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      results.sort((a, b) => b.price - a.price);
      break;
    default:
      // "relevance" — with real data this would weigh text match + recency + engagement.
      // For mock data, newest-first is a reasonable stand-in.
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return results;
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const listings = filterAndSortListings(params);

  return (
    <div className="page-fade-in">
      <Header />

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
