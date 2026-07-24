"use client";
import { useState, useEffect } from "react";

/**
 * PLACEHOLDER — replace with real offers backend later.
 */
export default function useOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("major_mock_offers");
    if (stored) setOffers(JSON.parse(stored));
  }, []);

  function persist(updated) {
    setOffers(updated);
    window.localStorage.setItem("major_mock_offers", JSON.stringify(updated));
  }

  function submitOffer({ listingId, listingName, sellerId, amount }) {
    const offer = {
      id: `offer_${Date.now()}`,
      listingId,
      listingName,
      sellerId,
      amount, // cents
      status: "pending", // "pending" | "accepted" | "declined"
      createdAt: new Date().toISOString(),
    };
    persist([offer, ...offers]);
    return offer.id;
  }

  function respondToOffer(id, status) {
    persist(offers.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return { offers, submitOffer, respondToOffer };
}
