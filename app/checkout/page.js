"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";
import useCart from "@/lib/CartContext";
import useOrders from "@/lib/useOrders";

const FLAT_SHIPPING = 500; // $5.00 placeholder — replace with real shipping calc later

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, isVerified, ready } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [placing, setPlacing] = useState(false);

  const shipping = items.length > 0 ? FLAT_SHIPPING : 0;
  const total = subtotal + shipping;

  function handlePlaceOrder() {
    setPlacing(true);
    // PLACEHOLDER — this is where the real Stripe Connect Payment Element
    // confirms payment before an order is created. See spec doc's
    // "Implementation appendix" for the Payment Intent / destination
    // charge code that belongs here.
    setTimeout(() => {
      const order = placeOrder({ items, subtotal, shipping, total });
      clearCart();
      router.push(`/checkout/confirmation?order=${order.id}`);
    }, 600);
  }

  if (!ready) return null;

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 640, margin: "50px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 28 }}>
          Checkout
        </h1>

        {!isLoggedIn && (
          <p style={{ fontSize: 12, marginBottom: 20, color: "var(--grey-hover)" }}>
            You&rsquo;ll need to{" "}
            <a href="/account/login" style={{ color: "var(--black)", textDecoration: "underline" }}>
              log in
            </a>{" "}
            before placing an order.
          </p>
        )}

        {isLoggedIn && !isVerified && (
          <p style={{ fontSize: 12, marginBottom: 20, color: "var(--grey-hover)" }}>
            Please{" "}
            <a href="/account" style={{ color: "var(--black)", textDecoration: "underline" }}>
              verify your email
            </a>{" "}
            before placing an order.
          </p>
        )}

        {items.length === 0 ? (
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ position: "relative", width: 56, height: 56, background: "var(--light-grey)", flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill sizes="56px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12 }}>{item.name}</p>
                    {item.type === "rent" && item.rentalDates && (
                      <p style={{ fontSize: 10, color: "var(--grey-hover)" }}>
                        Rent {item.rentalDates.start} – {item.rentalDates.end}
                      </p>
                    )}
                  </div>
                  <p style={{ fontSize: 12 }}>${(item.price / 100).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span>Shipping</span>
                <span>${(shipping / 100).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginTop: 6 }}>
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>

            <div
              style={{
                border: "1px dashed rgba(0,0,0,0.2)",
                padding: 20,
                marginBottom: 28,
                fontSize: 11,
                color: "var(--grey-hover)",
                textAlign: "center",
              }}
            >
              Stripe payment element goes here once Stripe Connect is wired in.
            </div>

            <button className="btn-major" style={{ width: "100%" }} onClick={handlePlaceOrder} disabled={placing || !isLoggedIn || !isVerified}>
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
