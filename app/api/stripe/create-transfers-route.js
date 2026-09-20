/**
 * app/api/stripe/create-transfers/route.js
 *
 * CHANGES:
 * - Now verifies the caller's Firebase ID token server-side (verifyRequestAuth)
 *   instead of trusting nothing at all — the buyerId on every order created
 *   here comes from the VERIFIED token, never from anything the client sent.
 *   This closes the "who is even calling this" gap, though it does NOT yet
 *   verify the ITEM PRICES against real Firestore listing data (that's the
 *   separate hardening pass still planned — this endpoint still trusts
 *   client-supplied `price` per item for the transfer amount itself).
 * - Creates a real Firestore order document per item (matching the iOS
 *   Order model exactly: id, listingId, paymentIntentId, buyerId, sellerId,
 *   amount, status, createdAt, isDelivered) — closing the "orders only ever
 *   lived in localStorage" gap. Written via the Admin SDK, which bypasses
 *   firestore.rules — appropriate here since this is trusted server code
 *   deciding the order's contents, not a client write.
 * - Requires `paymentIntentId` in the request body now (see
 *   CheckoutPaymentForm.js's matching change) — Order.paymentIntentId is a
 *   required, non-optional field on the iOS side, so an order can't be
 *   created correctly without it.
 *
 * ASSUMPTION TO VERIFY: each cart item is assumed to carry its own
 * Firestore listing id as `item.id` (matching how the cart page renders
 * items). If CartContext.js actually uses a different field name for the
 * listing id, update `item.id` below to match — I haven't seen
 * CartContext.js directly to confirm this.
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { adminDb, verifyRequestAuth } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const PLATFORM_FEE_PERCENT = 0.10; // matches the 10% fee stated on /terms

export async function POST(request) {
  try {
    const buyerId = await verifyRequestAuth(request);
    if (!buyerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, paymentIntentId } = await request.json(); // [{ id, sellerId, price }]

    if (!paymentIntentId) {
      return NextResponse.json({ error: "Missing paymentIntentId" }, { status: 400 });
    }

    const bySeller = {};
    for (const item of items) {
      if (!item.sellerId) continue;
      bySeller[item.sellerId] = (bySeller[item.sellerId] || 0) + item.price;
    }

    const transferResults = [];
    for (const [sellerId, total] of Object.entries(bySeller)) {
      const userSnap = await getDoc(doc(db, "users", sellerId));
      const stripeAccountId = userSnap.exists() ? userSnap.data().stripeAccountId : null;

      if (!stripeAccountId) {
        transferResults.push({ sellerId, skipped: true, reason: "Seller has no connected Stripe account" });
        continue;
      }

      const payoutAmount = Math.round(total * (1 - PLATFORM_FEE_PERCENT));
      const transfer = await stripe.transfers.create({
        amount: payoutAmount,
        currency: "usd",
        destination: stripeAccountId,
      });
      transferResults.push({ sellerId, transferId: transfer.id, amount: payoutAmount });
    }

    // Create one order document per item, matching the iOS Order model.
    const orderIds = [];
    for (const item of items) {
      if (!item.sellerId || !item.id) continue;

      const orderRef = adminDb.collection("orders").doc();
      await orderRef.set({
        listingId: item.id,
        paymentIntentId,
        buyerId,
        sellerId: item.sellerId,
        amount: item.price,
        status: "pending_confirmation",
        createdAt: FieldValue.serverTimestamp(),
        isDelivered: false,
      });
      orderIds.push(orderRef.id);
    }

    return NextResponse.json({ results: transferResults, orderIds });
  } catch (error) {
    console.error("Stripe transfer error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
