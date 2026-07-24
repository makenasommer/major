"use client";
import { useState, useEffect } from "react";

/**
 * PLACEHOLDER — replace with real reviews tied to completed orders later
 * (see spec doc: reviews should only be leavable after a completed order).
 */
export default function useReviews(sellerId) {
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(`major_mock_reviews_${sellerId}`);
    if (stored) setLocalReviews(JSON.parse(stored));
  }, [sellerId]);

  function submitReview({ rating, text, reviewerName }) {
    const review = {
      id: `review_${Date.now()}`,
      rating,
      text,
      reviewer: reviewerName || "you",
    };
    const updated = [review, ...localReviews];
    setLocalReviews(updated);
    window.localStorage.setItem(`major_mock_reviews_${sellerId}`, JSON.stringify(updated));
  }

  return { localReviews, submitReview };
}
