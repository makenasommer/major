import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { amount, customerId, paymentMethodId } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ skipped: true });
    }

    const depositIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      capture_method: "manual",
      off_session: true,
      confirm: true,
    });

    return NextResponse.json({ depositIntentId: depositIntent.id, status: depositIntent.status });
  } catch (error) {
    console.error("Stripe deposit hold error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
