import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { amount, email } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Find or create a Stripe Customer for this buyer, so their card can be
    // reused off-session for a rental deposit hold right after checkout.
    let customer;
    const existing = await stripe.customers.list({ email, limit: 1 });
    customer = existing.data[0] || (await stripe.customers.create({ email }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      setup_future_usage: "off_session",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, customerId: customer.id });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
