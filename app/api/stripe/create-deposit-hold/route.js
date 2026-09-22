/**
 * app/api/stripe/create-deposit-hold/route.js
 * HARDENED: verifies caller auth + real rental deposit amount from
 * Firestore listing.rentalOptions.depositAmount, not client-sent amount.
 */
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb, verifyRequestAuth } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const buyerId = await verifyRequestAuth(request);
    if (!buyerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId, customerId, paymentMethodId } = await request.json();
    if (!listingId || !customerId || !paymentMethodId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const listingSnap = await adminDb.collection("listings").doc(listingId).get();
    if (!listingSnap.exists) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    const realDeposit = listingSnap.data()?.rentalOptions?.depositAmount;
    if (typeof realDeposit !== "number" || realDeposit <= 0) {
      return NextResponse.json({ error: "No deposit required for this listing" }, { status: 400 });
    }

    const hold = await stripe.paymentIntents.create({
      amount: realDeposit,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      capture_method: "manual", // hold, not charge
    });

    return NextResponse.json({ holdId: hold.id, amount: realDeposit });
  } catch (error) {
    console.error("Deposit hold error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
