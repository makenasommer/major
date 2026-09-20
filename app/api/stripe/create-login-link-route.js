/**
 * app/api/stripe/create-login-link/route.js
 *
 * NEW — the "already onboarded, just open my Stripe dashboard" half of
 * the payouts flow, replacing the old bukuapis.netlify.app equivalent.
 * Same auth pattern as create-account-link: the account ID is looked up
 * server-side from the verified caller's own Firestore doc, never
 * trusted from the request.
 *
 * Uses Stripe's Express dashboard login link — this assumes the
 * connected account type is Express (matching what create-account-link
 * creates). If sellers are ever moved to Standard/Custom accounts, this
 * specific API call would need to change.
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb, verifyRequestAuth } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const uid = await verifyRequestAuth(request);
    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSnap = await adminDb.collection("users").doc(uid).get();
    if (!userSnap.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stripeAccountId = userSnap.data().stripeAccountId;
    if (!stripeAccountId) {
      // No account yet — caller should fall back to create-account-link.
      return NextResponse.json({ error: "No Stripe account found" }, { status: 404 });
    }

    const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);

    return NextResponse.json({ url: loginLink.url });
  } catch (error) {
    console.error("create-login-link error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
