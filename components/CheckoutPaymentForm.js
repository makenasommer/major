"use client";
import { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function PaymentForm({ onSuccess, customerId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError("");

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/checkout/confirmation`,
      },
    });

    if (submitError) {
      setError(submitError.message);
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess({ paymentMethodId: paymentIntent.payment_method, customerId });
    } else {
      setError("Payment did not complete. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 28 }}>
      <PaymentElement />
      {error && <p style={{ fontSize: 11, color: "#b00020", marginTop: 12 }}>{error}</p>}
      <button
        type="submit"
        className="btn-major"
        style={{ width: "100%", marginTop: 20 }}
        disabled={!stripe || submitting}
      >
        {submitting ? "Processing Payment..." : "Place Order"}
      </button>
    </form>
  );
}

export default function CheckoutPaymentForm({ amount, email, onSuccess }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setCustomerId(data.customerId);
      });
  }, [amount, email]);

  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  if (!clientSecret) {
    return <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Loading payment form...</p>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm onSuccess={onSuccess} customerId={customerId} />
    </Elements>
  );
}
