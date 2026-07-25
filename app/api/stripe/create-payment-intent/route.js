import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// NOTE: this charges the platform's own Stripe balance for now, since our
// listings are still mock data without real onboarded seller accounts.
// Once real listings/sellers exist, add `transfer_data: { destination: sellerAccountId }`
// and `application_fee_amount` here to split payment automatically — same
// pattern already used for rental deposit holds in the spec doc.
export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
