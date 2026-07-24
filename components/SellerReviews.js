"use client";
import Link from "next/link";
import useReviews from "@/lib/useReviews";

export default function SellerReviews({ sellerId, seedReviews }) {
  const { localReviews } = useReviews(sellerId);
  const allReviews = [...localReviews, ...seedReviews];

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)" }}>
          Reviews
        </h2>
        <Link href={`/sellers/${sellerId}/review`} className="footer-word">
          Leave a Review
        </Link>
      </div>

      {allReviews.length === 0 ? (
        <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>No reviews yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {allReviews.map((review) => (
            <div key={review.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 12 }}>
              <p style={{ fontSize: 11 }}>★ {review.rating} &middot; {review.reviewer}</p>
              <p style={{ fontSize: 12, color: "var(--grey-hover)", marginTop: 4 }}>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
