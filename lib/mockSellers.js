/**
 * PLACEHOLDER DATA — replace once seller profiles are backed by real accounts.
 */
export const MOCK_SELLERS = {
  s1: { id: "s1", name: "jordan.k", campus: "UCLA", joined: "Sept 2025", rating: 4.8, salesCount: 12, responseRate: "Usually responds within a day" },
  s2: { id: "s2", name: "priya.s", campus: "UCLA", joined: "Jan 2025", rating: 5.0, salesCount: 34, responseRate: "Usually responds within an hour" },
  s3: { id: "s3", name: "alex.t", campus: "UCLA", joined: "Aug 2024", rating: 4.6, salesCount: 7, responseRate: "Usually responds within a day" },
  s4: { id: "s4", name: "maya.l", campus: "UCLA", joined: "Feb 2025", rating: 4.9, salesCount: 21, responseRate: "Usually responds within a few hours" },
  s5: { id: "s5", name: "sam.r", campus: "UCLA", joined: "Sept 2024", rating: 4.7, salesCount: 15, responseRate: "Usually responds within a day" },
  s6: { id: "s6", name: "devon.w", campus: "UCLA", joined: "Mar 2025", rating: 4.9, salesCount: 9, responseRate: "Usually responds within a few hours" },
};

export const MOCK_REVIEWS = {
  s1: [
    { id: "r1", reviewer: "casey.m", rating: 5, text: "Item exactly as described, quick pickup!" },
    { id: "r2", reviewer: "taylor.b", rating: 4, text: "Good communication, would buy again." },
  ],
  s2: [
    { id: "r3", reviewer: "morgan.h", rating: 5, text: "Super sweet and item was in perfect condition." },
  ],
};

export function getSellerById(id) {
  return MOCK_SELLERS[id] || null;
}

export function getReviewsForSeller(id) {
  return MOCK_REVIEWS[id] || [];
}
