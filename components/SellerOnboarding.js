"use client";
import { useEffect, useState, useRef } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import { ConnectComponentsProvider, ConnectAccountOnboarding } from "@stripe/react-connect-js";
import useAuth from "@/lib/AuthContext";

export default function SellerOnboarding() {
  const { user, saveStripeAccountId } = useAuth();
  const [connectInstance, setConnectInstance] = useState(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const accountIdRef = useRef(user?.stripeAccountId || null);

  useEffect(() => {
    if (!user) return; // guard: don't fetch until real user data is available

    async function fetchClientSecret() {
      const res = await fetch("/api/stripe/account-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accountIdRef.current, email: user.email }),
      });
      const data = await res.json();

      if (!res.ok || !data.clientSecret) {
        console.error("Stripe onboarding error:", data.error || "Unknown error");
        throw new Error(data.error || "Failed to start payout setup.");
      }

      // First time creating this seller's account — save the id so we reuse it next time.
      if (!accountIdRef.current && data.accountId) {
        accountIdRef.current = data.accountId;
        saveStripeAccountId(data.accountId);
      }

      return data.clientSecret;
    }

    const instance = loadConnectAndInitialize({
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      fetchClientSecret,
    });
    setConnectInstance(instance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Loading payout setup...</p>;
  }

  if (!connectInstance) {
    return <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Loading payout setup...</p>;
  }

  return (
    <div>
      {onboardingComplete ? (
        <p style={{ fontSize: 12 }}>Payout setup complete — you&rsquo;re ready to receive payments.</p>
      ) : (
        <ConnectComponentsProvider connectInstance={connectInstance}>
          <ConnectAccountOnboarding onExit={() => setOnboardingComplete(true)} />
        </ConnectComponentsProvider>
      )}
    </div>
  );
}
