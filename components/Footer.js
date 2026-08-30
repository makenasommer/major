"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function DownloadAppMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="footer-word"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        Download App
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 8,
            background: "var(--white)",
            border: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            minWidth: 140,
            zIndex: 10,
          }}
        >
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-word"
            style={{ padding: "10px 14px" }}
            onClick={() => setOpen(false)}
          >
            App Store
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-word"
            style={{ padding: "10px 14px" }}
            onClick={() => setOpen(false)}
          >
            Google Play
          </a>
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ marginTop: 60, padding: "48px 36px 28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 64,
          flexWrap: "wrap",
          marginBottom: 36,
        }}
      >
        {/* Column 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/terms" className="footer-word">Terms</Link>
          <Link href="/faq" className="footer-word">FAQ</Link>
          <Link href="/privacy" className="footer-word">Privacy</Link>
          <Link href="/accessibility" className="footer-word">Accessibility</Link>
          <Link href="/cookie-policy" className="footer-word">Cookie Policy</Link>
        </div>
        {/* Column 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/about" className="footer-word">About</Link>
          <Link href="/sustainability" className="footer-word">Sustainability &amp; Impact</Link>
          <Link href="/partners" className="footer-word">Partners</Link>
        </div>
        {/* Column 3 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/contact" className="footer-word">Contact</Link>
          <DownloadAppMenu />
          <Link href="/demo" className="footer-word">Demo</Link>
        </div>
      </div>
      <p style={{ fontSize: 10, color: "var(--black)" }}>
        Copyright &ldquo;Major&rdquo; 2023
      </p>
    </footer>
  );
}
