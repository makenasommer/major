import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PLATFORM_FEE_PERCENT = 0.10; // matches the 10% fee stated on /terms

export async function POST(request) {
  try {
    const { items } = await request.json(); // [{ sellerId, price }]

    const bySeller = {};
    for (const item of items) {
      if (!item.sellerId) continue;
      bySeller[item.sellerId] = (bySeller[item.sellerId] || 0) + item.price;
    }

    const results = [];
    for (const [sellerId, total] of Object.entries(bySeller)) {
      const userSnap = await getDoc(doc(db, "users", sellerId));
      const stripeAccountId = userSnap.exists() ? userSnap.data().stripeAccountId : null;

      if (!stripeAccountId) {
        results.push({ sellerId, skipped: true, reason: "Seller has no connected Stripe account" });
        continue;
      }

      const payoutAmount = Math.round(total * (1 - PLATFORM_FEE_PERCENT));
      const transfer = await stripe.transfers.create({
        amount: payoutAmount,
        currency: "usd",
        destination: stripeAccountId,
      });
      results.push({ sellerId, transferId: transfer.id, amount: payoutAmount });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Stripe transfer error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
