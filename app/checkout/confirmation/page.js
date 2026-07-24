"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
        Order Confirmed
      </h1>
      {orderId && (
        <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 24 }}>Order #{orderId}</p>
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
