"use client";
import { useState } from "react";

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      style={{
        background: "var(--black)",
        color: "var(--white)",
        fontSize: 11,
        letterSpacing: "0.04em",
        textAlign: "center",
        padding: "10px 36px",
        position: "relative",
      }}
    >
      {/* PLACEHOLDER: add your banner message here */}
      Add your banner message here.
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "var(--white)",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        &times;
      </button>
    </div>
  );
}
