"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutPaymentForm from "@/components/CheckoutPaymentForm";
import useAuth from "@/lib/AuthContext";
import useCart from "@/lib/CartContext";
import useOrders from "@/lib/useOrders";

const FLAT_SHIPPING = 500; // $5.00 placeholder: replace with real shipping calc later

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoggedIn, isVerified, ready } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const shipping = items.length > 0 ? FLAT_SHIPPING : 0;
  const total = subtotal + shipping;

  const depositTotal = items.reduce((sum, item) => sum + (item.depositAmount || 0), 0);

  async function handlePaymentSuccess({ paymentMethodId, customerId }) {
    // Split payment out to each seller (minus platform fee).
    fetch("/api/stripe/create-transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    }).catch((err) => console.error("Transfer creation failed:", err));

    // Place a hold for any rental deposits, reusing the card just used.
    if (depositTotal > 0 && paymentMethodId && customerId) {
      fetch("/api/stripe/create-deposit-hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: depositTotal, customerId, paymentMethodId }),
      }).catch((err) => console.error("Deposit hold failed:", err));
    }

    const order = placeOrder({ items, subtotal, shipping, total });
    clearCart();
    router.push(`/checkout/confirmation?order=${order.id}`);
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
                        Rent {item.rentalDates.start} to {item.rentalDates.end}
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
              {depositTotal > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span>Refundable Deposit (held, not charged)</span>
                  <span>${(depositTotal / 100).toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, marginTop: 6 }}>
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>

            {isLoggedIn && isVerified ? (
              <CheckoutPaymentForm amount={total} email={user?.email} onSuccess={handlePaymentSuccess} />
            ) : (
              <p style={{ fontSize: 11, color: "var(--grey-hover)", textAlign: "center", marginBottom: 28 }}>
                Log in and verify your email to enable payment.
              </p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
