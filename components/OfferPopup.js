"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "major_seen_offer_popup";

export default function OfferPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    // PLACEHOLDER: wire this to your actual email list provider / discount code system
    setSubmitted(true);
    setTimeout(dismiss, 1200);
  }

  if (!visible) return null;

  return (
    <div className="overlay" onClick={dismiss}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--white)",
          maxWidth: 380,
          width: "90vw",
          padding: 32,
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
          10% Off On Us!
        </h2>
        <p style={{ fontSize: 12, color: "var(--grey-hover)", lineHeight: 1.7, marginBottom: 20 }}>
          Join Major Honors and get 10% off your first purchase, plus early access to promos, events, and content
          to make each day on campus a little better. For you and our Earth, from Major.
        </p>

        {submitted ? (
          <p style={{ fontSize: 12 }}>You&rsquo;re in! Check your email for your code.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                fontFamily: "var(--font)",
                fontSize: 12,
                border: "1px solid var(--black)",
                padding: 12,
                textTransform: "uppercase",
              }}
            />
            <button type="submit" className="btn-major">Continue</button>
          </form>
        )}

        <p style={{ fontSize: 9, fontStyle: "italic", color: "var(--grey-hover)", marginTop: 16, lineHeight: 1.6 }}>
          Offers cannot be combined with any other discount, promo, or percentage off. Limit one per transaction.
          Exceptions for Major Equity &amp; Enviro Club.
        </p>
      </div>
    </div>
  );
}
