import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// NOTE: this trusts the accountId/email sent from the client. In production,
// verify the Firebase ID token server-side (via Firebase Admin SDK) before
// trusting which user this request is for, rather than taking their word for it.
export async function POST(request) {
  try {
    const { accountId, email } = await request.json();

    let account_id = accountId;

    if (!account_id) {
      const account = await stripe.accounts.create({
        controller: {
          stripe_dashboard: { type: "none" },
          fees: { payer: "application" },
          losses: { payments: "application" },
          requirement_collection: "application",
        },
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
        country: "US",
        email,
      });
      account_id = account.id;
    }

    const accountSession = await stripe.accountSessions.create({
      account: account_id,
      components: {
        account_onboarding: { enabled: true },
      },
    });

    return NextResponse.json({
      accountId: account_id,
      clientSecret: accountSession.client_secret,
    });
  } catch (error) {
    console.error("Stripe account session error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
