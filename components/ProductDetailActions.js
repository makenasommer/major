"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/lib/CartContext";
import useOffers from "@/lib/useOffers";

export default function ProductDetailActions({ listing }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { submitOffer } = useOffers();
  const [liked, setLiked] = useState(false);
  const [rentalStart, setRentalStart] = useState("");
  const [rentalEnd, setRentalEnd] = useState("");
  const [added, setAdded] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerSent, setOfferSent] = useState(false);

  const isRental = listing.type === "rent";

  function calculateRentalTotal() {
    if (!rentalStart || !rentalEnd) return null;
    const days = Math.ceil(
      (new Date(rentalEnd) - new Date(rentalStart)) / (1000 * 60 * 60 * 24)
    );
    if (days <= 0) return null;
    return { days, total: days * listing.price };
  }

  const rentalTotal = isRental ? calculateRentalTotal() : null;

  function handleAddToCart() {
    if (isRental) {
      if (!rentalTotal) return; // dates required before a rental can be added
      addItem({
        id: `${listing.id}-${rentalStart}-${rentalEnd}`,
        name: listing.name,
        price: rentalTotal.total,
        image: listing.images[0],
        type: "rent",
        rentalDates: { start: rentalStart, end: rentalEnd },
        sellerId: listing.sellerId,
        depositAmount: listing.rentalOptions?.depositAmount || 0,
      });
    } else {
      addItem({
        id: listing.id,
        name: listing.name,
        price: listing.price,
        image: listing.images[0],
        type: "buy",
        sellerId: listing.sellerId,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleMessageSeller() {
    // Conversations can only start from a listing: see spec doc.
    const params = new URLSearchParams({
      listing: listing.id,
      listingName: listing.name,
      seller: listing.sellerId,
      sellerName: listing.sellerName,
    });
    router.push(`/messages/new?${params.toString()}`);
  }

  function handleSubmitOffer(e) {
    e.preventDefault();
    const cents = Math.round(parseFloat(offerAmount) * 100);
    if (!cents || cents <= 0) return;
    submitOffer({ listingId: listing.id, listingName: listing.name, sellerId: listing.sellerId, amount: cents });
    setOfferSent(true);
    setOfferAmount("");
    setTimeout(() => {
      setOfferSent(false);
      setOfferOpen(false);
    }, 1800);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {isRental && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)" }}>
            Select Rental Dates
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="date"
              value={rentalStart}
              onChange={(e) => setRentalStart(e.target.value)}
              style={{ fontFamily: "var(--font)", fontSize: 11, border: "1px solid var(--black)", padding: 8, flex: 1 }}
            />
            <input
              type="date"
              value={rentalEnd}
              onChange={(e) => setRentalEnd(e.target.value)}
              style={{ fontFamily: "var(--font)", fontSize: 11, border: "1px solid var(--black)", padding: 8, flex: 1 }}
            />
          </div>
          {rentalTotal && (
            <p style={{ fontSize: 11 }}>
              {rentalTotal.days} day{rentalTotal.days > 1 ? "s" : ""}: $
              {(rentalTotal.total / 100).toFixed(2)} total
              {listing.rentalOptions?.depositAmount && (
                <span style={{ color: "var(--grey-hover)" }}>
                  {" "}+ ${(listing.rentalOptions.depositAmount / 100).toFixed(2)} refundable deposit hold
                </span>
              )}
            </p>
          )}
        </div>
      )}

      <button className="btn-major" onClick={handleAddToCart} disabled={isRental && !rentalTotal}>
        {added ? "Added ✓" : isRental ? "Reserve" : "Add to Cart"}
      </button>

      {!isRental && (
        <>
          {!offerOpen ? (
            <button className="btn-major-outline" onClick={() => setOfferOpen(true)}>
              Make an Offer
            </button>
          ) : offerSent ? (
            <p style={{ fontSize: 11, textAlign: "center", color: "var(--grey-hover)" }}>Offer sent to seller ✓</p>
          ) : (
            <form onSubmit={handleSubmitOffer} style={{ display: "flex", gap: 8 }}>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Your offer ($)"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                style={{ flex: 1, fontFamily: "var(--font)", fontSize: 11, border: "1px solid var(--black)", padding: 10 }}
              />
              <button type="submit" className="btn-major">Send</button>
            </form>
          )}
        </>
      )}

      <button className="btn-major-outline" onClick={handleMessageSeller}>
        Message Seller
      </button>

      <button
        className="btn-major-outline"
        style={{ borderColor: "transparent" }}
        onClick={() => setLiked((l) => !l)}
      >
        {liked ? "♥ Saved" : "♡ Save"}
      </button>
    </div>
  );
}
