/**
 * app/api/stripe/create-account-link/route.js
 *
 * NEW — replaces the old bukuapis.netlify.app Netlify function the iOS
 * app was calling (leftover from the predecessor "Buku" app, entirely
 * disconnected from this project's actual Stripe setup).
 *
 * Also fixes the security gap flagged in account-session/route.js's own
 * code comments ("trusts accountId/email sent from client... verify the
 * Firebase ID token server-side") — the account ID here is looked up
 * server-side from the VERIFIED caller's own Firestore user doc, never
 * trusted from the request body.
 *
 * Uses Stripe's hosted Account Links onboarding flow (a plain
 * redirect URL) rather than embedded components — embedded components
 * are a browser-JS UI element that can't be opened directly in a native
 * iOS app. A hosted link works with a plain in-app Safari view, which
 * SettingsView.swift already has built for exactly this purpose.
 *
 * Also handles first-time setup: if the caller has no Stripe account yet,
 * creates one (Express — matches the account-session route's onboarding
 * type) before generating the link.
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

    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    let stripeAccountId = userData.stripeAccountId;

    // First-time setup: no connected account yet — create one.
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: userData.email,
      });
      stripeAccountId = account.id;
      await userRef.update({ stripeAccountId });
      // NOTE: this write alone doesn't update publicProfiles/sellerPayoutStatus —
      // the syncSellerPayoutStatus Cloud Function trigger handles that
      // automatically (see sellerPayoutStatus.js), no extra code needed here.
    }

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: "major://payouts/setup",
      return_url: "major://payouts/success",
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("create-account-link error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
