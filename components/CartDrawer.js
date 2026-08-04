"use client";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/lib/AuthContext";
import useCart from "@/lib/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { isLoggedIn } = useAuth();
  const { items, subtotal, removeItem } = useCart();

  if (!open) return null;

  const hasItems = isLoggedIn && items.length > 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 380,
          maxWidth: "90vw",
          height: "100%",
          background: "var(--white)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 28px 24px",
          animation: "slideInRight 0.4s var(--ease-out-expo)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {hasItems ? "Your Cart" : "Cart"}
          </span>
          <button onClick={onClose} className="popup-close" style={{ position: "static" }}>
            &times;
          </button>
        </div>

        {!hasItems && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
            <p style={{ fontSize: 12, letterSpacing: "0.04em" }}>Your Cart is Empty</p>
            {!isLoggedIn && (
              <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>
                Have an account?{" "}
                <Link href="/account/login" className="nav-word" style={{ textTransform: "none", letterSpacing: 0 }} onClick={onClose}>
                  Log in
                </Link>{" "}
                to pursue a transaction
              </p>
            )}
          </div>
        )}

        {hasItems && (
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12 }}>
                <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0, background: "var(--light-grey)" }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontSize: 11 }}>{item.name}</span>
                  {item.type === "rent" && item.rentalDates && (
                    <span style={{ fontSize: 10, color: "var(--grey-hover)" }}>
                      Rent {item.rentalDates.start} to {item.rentalDates.end}
                    </span>
                  )}
                  <span style={{ fontSize: 11, marginTop: 2 }}>${(item.price / 100).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--grey-hover)", alignSelf: "flex-start" }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {hasItems && (
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16, marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 14 }}>
              <span style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>Subtotal</span>
              <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn-major" style={{ display: "block", textAlign: "center", textDecoration: "none" }} onClick={onClose}>
              Checkout
            </Link>
          </div>
        )}

        <button className="btn-major" style={{ marginTop: 12, background: "transparent", color: "var(--black)", border: "1px solid var(--black)" }} onClick={onClose}>
          Continue Shopping
        </button>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
