/**
 * app/api/stripe/create-login-link/route.js
 *
 * CHANGED: rather than assuming every connected account is Express (which
 * couldn't be confirmed from the Stripe Dashboard UI), this now checks
 * the account's actual type via the Stripe API before deciding how to
 * get the seller into their dashboard. Handles all three account types
 * safely instead of guessing:
 *
 * - Express: createLoginLink() works directly (Stripe's simplified,
 *   platform-generated dashboard access).
 * - Standard: these sellers have their OWN full Stripe account and log
 *   in directly at dashboard.stripe.com with their own credentials —
 *   there's no special link to generate. Returns a message instead of a
 *   broken/incorrect link.
 * - Custom: no Stripe-hosted dashboard exists at all for these (fully
 *   white-labeled) — flagged clearly rather than silently failing.
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
      return NextResponse.json({ error: "No Stripe account found" }, { status: 404 });
    }

    // Check the REAL account type via the API instead of assuming.
    const account = await stripe.accounts.retrieve(stripeAccountId);

    if (account.type === "express") {
      const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);
      return NextResponse.json({ url: loginLink.url, accountType: "express" });
    }

    if (account.type === "standard") {
      // Standard accounts are the seller's own full Stripe account —
      // no platform-generated link applies. Direct them to log in
      // themselves rather than returning a broken/incorrect URL.
      return NextResponse.json({
        accountType: "standard",
        message: "This account manages its own Stripe login — sign in directly at dashboard.stripe.com.",
      });
    }

    // Custom accounts have no Stripe-hosted dashboard at all.
    return NextResponse.json({
      accountType: account.type,
      error: "This account type has no dashboard to open.",
    }, { status: 400 });

  } catch (error) {
    console.error("create-login-link error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
