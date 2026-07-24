"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div
        style={{ width: "480px", maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Major"
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid var(--black)",
              outline: "none",
              fontFamily: "var(--font)",
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: "0.02em",
              padding: "10px 0",
              background: "transparent",
              color: "var(--black)",
              textAlign: "center",
            }}
          />
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "var(--grey-hover)",
            textTransform: "uppercase",
          }}
        >
          Press Enter to search &middot; Esc to close
        </p>
      </div>
    </div>
  );
}
