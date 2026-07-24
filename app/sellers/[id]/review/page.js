"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useReviews from "@/lib/useReviews";
import useAuth from "@/lib/AuthContext";

export default function LeaveReviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { submitReview } = useReviews(id);
  const { user, isLoggedIn, ready } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    // PLACEHOLDER — in the real flow, this should only be reachable
    // from a completed order tied to this seller, not open to anyone.
    submitReview({ rating, text: text.trim(), reviewerName: user?.name });
    setSubmitted(true);
    setTimeout(() => router.push(`/sellers/${id}`), 1200);
  }

  if (!ready) return null;

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 480, margin: "60px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 15, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 20 }}>
          Leave a Review
        </h1>

        {!isLoggedIn ? (
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
            <a href="/account/login" style={{ color: "var(--black)", textDecoration: "underline" }}>Log in</a> to leave a review.
          </p>
        ) : submitted ? (
          <p style={{ fontSize: 12 }}>Thanks — your review has been posted.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 8 }}>
                Rating
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: n <= rating ? "var(--black)" : "rgba(0,0,0,0.2)" }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="How was your experience?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 12, resize: "vertical" }}
            />

            <button type="submit" className="btn-major">Submit Review</button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
