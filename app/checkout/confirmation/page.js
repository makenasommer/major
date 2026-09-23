"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * CHANGED: previously read a `?order=` param expecting a single
 * localStorage-backed synthetic order id (from the old useOrders.js
 * placeholder). Orders are now real Firestore documents created
 * server-side, possibly multiple at once (one per item) — checkout now
 * navigates here with `?paymentIntentId=` instead, since that's the one
 * stable reference known immediately after payment. This looks up the
 * real order(s) that were created from that payment.
 */
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("paymentIntentId");
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    if (!paymentIntentId) return;

    async function loadOrders() {
      const q = query(collection(db, "orders"), where("paymentIntentId", "==", paymentIntentId));
      const snapshot = await getDocs(q);
      setOrderCount(snapshot.size);
    }
    loadOrders().catch((err) => console.error("Failed to load order confirmation:", err));
  }, [paymentIntentId]);

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
        Order Confirmed
      </h1>
      {orderCount !== null && (
        <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 24 }}>
          {orderCount} {orderCount === 1 ? "item" : "items"} confirmed
        </p>
      )}
      <p style={{ fontSize: 12, color: "var(--grey-hover)", marginBottom: 28 }}>
        Your order has been placed. You can track its status from your Account page.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link href="/account" className="btn-major-outline" style={{ textDecoration: "none" }}>
          View Order History
        </Link>
        <Link href="/shop" className="btn-major" style={{ textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <Suspense fallback={null}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}
