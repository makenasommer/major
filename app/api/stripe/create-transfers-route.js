/**
 * app/api/stripe/create-transfers/route.js
 *
 * HARDENED — this is the fix for the price-trust gap flagged earlier.
 *
 * BEFORE: transfer amounts (and order records) were built entirely from
 * client-supplied `item.price` values. Anyone could open dev tools and
 * POST a fabricated price, moving real money to a seller's account for
 * far more (or less) than the actual listing price — or even a
 * completely different listing than the one that was actually paid for.
 *
 * NOW: for every item, the REAL price is fetched from the listing's own
 * Firestore document (via Admin SDK — trusted, not client-editable) and
 * that is what gets used for both the transfer amount and the order
 * record. The client-sent `item.price` is only used as a courtesy
 * sanity check (mismatch gets logged) — it never drives the actual
 * money movement.
 *
 * Still verifies the caller's identity server-side (from the earlier
 * pass) and creates real Firestore order documents (from the orders-gap
 * fix) — this version combines both with the new price verification.
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
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
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // HARDENED: fetch each listing's REAL data server-side. This is the
    // actual fix — everything below uses `realPrice` and `realSellerId`
    // from Firestore, never the client-sent values, for anything that
    // moves money or creates a permanent record.
    const verifiedItems = [];
    for (const item of items) {
      if (!item.id) continue;

      const listingSnap = await adminDb.collection("listings").doc(item.id).get();
      if (!listingSnap.exists) {
        console.warn(`create-transfers: listing ${item.id} not found, skipping`);
        continue;
      }

      const listing = listingSnap.data();
      const realPrice = listing.price;       // authoritative — from Firestore, not the client
      const realSellerId = listing.sellerId; // authoritative — same reason

      if (typeof realPrice !== "number" || realPrice <= 0) {
        console.warn(`create-transfers: listing ${item.id} has invalid price, skipping`);
        continue;
      }

      // Courtesy sanity check only — logged, never trusted for the
      // actual transfer/order amount.
      if (item.price !== realPrice || item.sellerId !== realSellerId) {
        console.warn(
          `create-transfers: client-sent values for item ${item.id} didn't match Firestore ` +
          `(client price=${item.price} vs real=${realPrice}, client sellerId=${item.sellerId} vs real=${realSellerId}) — using real values.`
        );
      }

      verifiedItems.push({ listingId: item.id, sellerId: realSellerId, price: realPrice });
    }

    if (verifiedItems.length === 0) {
      return NextResponse.json({ error: "No valid items found" }, { status: 400 });
    }

    // Aggregate verified amounts per seller for the Stripe transfer.
    const bySeller = {};
    for (const item of verifiedItems) {
      bySeller[item.sellerId] = (bySeller[item.sellerId] || 0) + item.price;
    }

    const transferResults = [];
    for (const [sellerId, total] of Object.entries(bySeller)) {
      const userSnap = await adminDb.collection("users").doc(sellerId).get();
      const stripeAccountId = userSnap.exists ? userSnap.data().stripeAccountId : null;

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

    // One order document per item, using VERIFIED price/sellerId.
    const orderIds = [];
    for (const item of verifiedItems) {
      const orderRef = adminDb.collection("orders").doc();
      await orderRef.set({
        listingId: item.listingId,
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
