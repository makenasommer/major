/**
 * PLACEHOLDER DATA — replace with real listings from your database once
 * sellers can actually create listings. Shape matches what the Shop page
 * and product detail page expect, so swapping in real data later is a
 * drop-in replacement, not a rewrite.
 */
export const MOCK_LISTINGS = [
  {
    id: "1",
    name: "Mini Fridge — 3.2 cu ft",
    price: 4500, // cents
    images: ["/images/home-photo-1.png"],
    category: "dorm-essentials",
    campus: "UCLA",
    condition: "like-new",
    type: "buy",
    sale: false,
    description: "Barely used mini fridge, perfect for dorm rooms. Quiet compressor, small footprint.",
    seller: { id: "s1", name: "jordan.k", rating: 4.8, salesCount: 12 },
    createdAt: "2026-07-01",
  },
  {
    id: "2",
    name: "Major Campus Hoodie",
    price: 3200,
    images: ["/images/home-photo-2.png"],
    category: "merch",
    campus: "UCLA",
    condition: "new",
    type: "buy",
    sale: true,
    description: "Official Major campus hoodie, unworn with tags.",
    seller: { id: "s2", name: "priya.s", rating: 5.0, salesCount: 34 },
    createdAt: "2026-07-10",
  },
  {
    id: "3",
    name: "Digital Multimeter (Lab Kit)",
    price: 1800,
    images: ["/images/home-photo-1.png"],
    category: "lab-equipment",
    campus: "Fordham",
    condition: "used",
    type: "buy",
    sale: false,
    description: "Standard multimeter used for intro circuits lab. Works perfectly.",
    seller: { id: "s3", name: "alex.t", rating: 4.6, salesCount: 7 },
    createdAt: "2026-06-28",
  },
  {
    id: "4",
    name: "Acrylic Paint Set (24 colors)",
    price: 2200,
    images: ["/images/home-photo-2.png"],
    category: "art-materials",
    campus: "Santa Monica College",
    condition: "like-new",
    type: "buy",
    sale: false,
    description: "Barely-used acrylic set, great for studio art courses.",
    seller: { id: "s4", name: "maya.l", rating: 4.9, salesCount: 21 },
    createdAt: "2026-07-05",
  },
  {
    id: "5",
    name: "Intro to Organic Chemistry (5th Ed)",
    price: 4000,
    images: ["/images/home-photo-1.png"],
    category: "books",
    campus: "USC",
    condition: "used",
    type: "buy",
    sale: true,
    description: "Some highlighting, all pages intact. Required for CHEM 30A.",
    seller: { id: "s5", name: "sam.r", rating: 4.7, salesCount: 15 },
    createdAt: "2026-06-20",
  },
  {
    id: "6",
    name: "DSLR Camera — available to rent",
    price: 1500, // per-day rental price
    images: ["/images/home-photo-2.png"],
    category: "other",
    campus: "USC",
    condition: "like-new",
    type: "rent",
    sale: false,
    rentalOptions: {
      durations: [4, 8],
      depositAmount: 10000,
    },
    description: "Great for a weekend project or event coverage. Comes with one extra battery.",
    seller: { id: "s6", name: "devon.w", rating: 4.9, salesCount: 9 },
    createdAt: "2026-07-08",
  },
];

export function getListingById(id) {
  return MOCK_LISTINGS.find((l) => l.id === id) || null;
}
