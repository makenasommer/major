"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import BagIcon from "./icons/BagIcon";
import SearchOverlay from "./SearchOverlay";
import CartDrawer from "./CartDrawer";
import CountrySelector from "./CountrySelector";

const SHOP_CATEGORIES = [
  { label: "Dorm Essentials", href: "/shop?category=dorm-essentials" },
  { label: "Merch", href: "/shop?category=merch" },
  { label: "Lab Equipment", href: "/shop?category=lab-equipment" },
  { label: "Art Materials", href: "/shop?category=art-materials" },
  { label: "Books", href: "/shop?category=books" },
  { label: "Rentals", href: "/shop?type=rent" },
  { label: "Other", href: "/shop?category=other" },
];

const SELL_LINKS = [
  { label: "List to Sell", href: "/sell/new?type=sell" },
  { label: "List to Rent", href: "/sell/new?type=rent" },
  { label: "Seller Dashboard", href: "/account/selling" },
  { label: "Seller Guidelines", href: "/sell/guidelines" },
];

// Static per-campus currency — no live conversion, see spec doc.
const CAMPUS_CURRENCY = "USD";

export default function Header({ campusName = "UCLA" }) {
  const [openDropdown, setOpenDropdown] = useState(null); // "shop" | "sell" | null
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [country, setCountry] = useState("US");
  const navRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 36px",
          position: "relative",
          zIndex: 40,
        }}
      >
        {/* Left: Home / Shop / Sell */}
        <nav ref={navRef} style={{ display: "flex", gap: 28, position: "relative" }}>
          <Link href="/" className="nav-word">Home</Link>

          <div style={{ position: "relative" }}>
            <button
              className="nav-word"
              onClick={() => setOpenDropdown(openDropdown === "shop" ? null : "shop")}
            >
              Shop
            </button>
            {openDropdown === "shop" && (
              <div className="header-dropdown">
                {SHOP_CATEGORIES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="header-dropdown-item"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              className="nav-word"
              onClick={() => setOpenDropdown(openDropdown === "sell" ? null : "sell")}
            >
              Sell
            </button>
            {openDropdown === "sell" && (
              <div className="header-dropdown">
                {SELL_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="header-dropdown-item"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Center: Wordmark (swap for <Image src="/major-logo.png" /> once final logo is ready) */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font)",
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--black)",
          }}
        >
          Major
        </Link>

        {/* Right: Currency / Search / Profile / Bag */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <CountrySelector selected={country} onSelect={(cty) => setCountry(cty.code)} />

          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <SearchIcon />
          </button>

          <Link href="/account" aria-label="Account" style={{ display: "flex" }}>
            <ProfileIcon />
          </Link>

          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <BagIcon />
          </button>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
