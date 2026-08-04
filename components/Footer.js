"use client";
import { useState } from "react";
import Link from "next/link";

function DownloadAppMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="footer-word"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        Download the App
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            marginBottom: 8,
            background: "var(--white)",
            border: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            minWidth: 160,
            zIndex: 10,
          }}
        >
          {/* PLACEHOLDER links - replace with your real App Store / Google Play listing URLs once live */}
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="footer-word" style={{ padding: "10px 14px" }}>
            App Store
          </a>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="footer-word" style={{ padding: "10px 14px" }}>
            Google Play
          </a>
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    // PLACEHOLDER: wire this to your actual email list provider
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: 60, padding: "40px 36px 24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {/* Column 1: Subscribe */}
        <div style={{ flex: "1 1 240px", maxWidth: 320 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
            Subscribe to Our Emails
          </p>
          <p style={{ fontSize: 11, color: "var(--grey-hover)", marginBottom: 14 }}>
            Be the first to know about new drops and special offers.
          </p>
          {subscribed ? (
            <p style={{ fontSize: 11 }}>You&rsquo;re on the list.</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", borderBottom: "1px solid var(--black)", paddingBottom: 6 }}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font)",
                  fontSize: 11,
                  color: "var(--black)",
                }}
              />
              <button type="submit" aria-label="Subscribe" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Column 2: legal links, no header label */}
        <div style={{ flex: "1 1 160px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/terms" className="footer-word">Terms of Service</Link>
            <Link href="/faq" className="footer-word">FAQ</Link>
            <Link href="/privacy-choices" className="footer-word">Your Privacy Choices</Link>
          </div>
        </div>

        {/* Column 3: About */}
        <div style={{ flex: "1 1 160px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
            About
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link href="/about" className="footer-word">About Us</Link>
            <Link href="/sustainability" className="footer-word">Sustainability Report</Link>
            <Link href="/investors" className="footer-word">Investor Relations</Link>
            <Link href="/contact" className="footer-word">Contact Us</Link>
            <Link href="/demo" className="footer-word">Book a Demo</Link>
            <Link href="/press" className="footer-word">Press</Link>
            <Link href="/partners" className="footer-word">Partners</Link>
          </div>
        </div>

        {/* Column 4: Download the App */}
        <div style={{ flex: "1 1 160px", display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <DownloadAppMenu />
        </div>
      </div>

      <p style={{ fontSize: 10, color: "var(--grey-hover)", textAlign: "center" }}>
        Copyright &ldquo;Major&rdquo; 2023
      </p>
    </footer>
  );
}
