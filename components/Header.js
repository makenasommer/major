"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "./icons/SearchIcon";
import ProfileIcon from "./icons/ProfileIcon";
import BagIcon from "./icons/BagIcon";
import SearchOverlay from "./SearchOverlay";
import CartDrawer from "./CartDrawer";
import CountrySelector from "./CountrySelector";
import useAuth from "@/lib/AuthContext";

const SHOP_CATEGORIES = [
  { label: "Dorm Essentials", href: "/shop?category=dorm-essentials" },
  { label: "Merch", href: "/shop?category=merch" },
  { label: "Lab Equipment", href: "/shop?category=lab-equipment" },
  { label: "Art Materials", href: "/shop?category=art-materials" },
  { label: "Books", href: "/shop?category=books" },
  { label: "Small Business on Campus", href: "/shop?category=small-business" },
  { label: "Services", href: "/shop?category=services" },
  { label: "Rentals", href: "/shop?type=rent" },
  { label: "Other", href: "/shop?category=other" },
];

const SELL_LINKS = [
  { label: "List to Sell", href: "/sell/new?type=sell" },
  { label: "List to Rent", href: "/sell/new?type=rent" },
  { label: "Seller Dashboard", href: "/account/selling" },
];

// Static per-campus currency: no live conversion, see spec doc.
const CAMPUS_CURRENCY = "USD";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="5.5" x2="18" y2="5.5" stroke="black" strokeWidth="1.2" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1.2" />
      <line x1="2" y1="14.5" x2="18" y2="14.5" stroke="black" strokeWidth="1.2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1.5" y1="1.5" x2="16.5" y2="16.5" stroke="black" strokeWidth="1.2" />
      <line x1="16.5" y1="1.5" x2="1.5" y2="16.5" stroke="black" strokeWidth="1.2" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s var(--ease-out-expo)" }}
    >
      <path d="M1.5 3.5L5 7L8.5 3.5" stroke="black" strokeWidth="1.1" />
    </svg>
  );
}

export default function Header({ campusName = "UCLA" }) {
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null); // "shop" | "sell" | null (desktop mega-menu)
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [country, setCountry] = useState("US");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null); // "shop" | "sell" | null (mobile accordion)
  const navRef = useRef(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown / mobile menu on Escape (keyboard accessibility)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileSubOpen(null);
  }

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px",
          position: "relative",
          zIndex: 40,
        }}
      >
        {/* Mobile: hamburger toggle (hidden on desktop via CSS) */}
        <button
          className="mobile-menu-toggle"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </button>

        {/* Desktop: Shop / Sell / Rent / Resources (hidden on mobile via CSS) */}
        <nav ref={navRef} className="desktop-nav" style={{ gap: 28, position: "relative" }}>
          <div style={{ position: "relative" }}>
            <button
              className="nav-word"
              onClick={() => setOpenDropdown(openDropdown === "shop" ? null : "shop")}
              aria-expanded={openDropdown === "shop"}
              aria-haspopup="true"
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
              aria-expanded={openDropdown === "sell"}
              aria-haspopup="true"
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

          <Link href="/shop?type=rent" className="nav-word">Rent</Link>
          <Link href="/resources" className="nav-word">Resources</Link>
        </nav>

        {/* Center: Logo */}
        <Link
          href="/"
          aria-label="Major"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="/major_logo_transparent.svg"
            alt="Major"
            width={110}
            height={28}
            priority
            style={{ height: 28, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Right: Currency (desktop only) / Search / Profile / Bag (always visible) */}
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div className="desktop-nav">
            <CountrySelector selected={country} onSelect={(cty) => setCountry(cty.code)} />
          </div>

          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <SearchIcon />
          </button>

          <Link href="/account" aria-label="Account" style={{ display: "flex" }}>
            {user?.photoURL ? (
              <div style={{ position: "relative", width: 16, height: 16, borderRadius: "50%", overflow: "hidden" }}>
                <Image src={user.photoURL} alt={user.username || user.name} fill style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <ProfileIcon />
            )}
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

      {/* Mobile full-screen menu panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <Image
              src="/major_logo_transparent.svg"
              alt="Major"
              width={90}
              height={22}
              style={{ height: 22, width: "auto", objectFit: "contain" }}
            />
            <button aria-label="Close menu" onClick={closeMobileMenu} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <CloseIcon />
            </button>
          </div>

          <div>
            <button
              className="mobile-menu-item"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
              onClick={() => setMobileSubOpen(mobileSubOpen === "shop" ? null : "shop")}
              aria-expanded={mobileSubOpen === "shop"}
            >
              Shop <ChevronIcon open={mobileSubOpen === "shop"} />
            </button>
            {mobileSubOpen === "shop" && (
              <div style={{ display: "flex", flexDirection: "column", padding: "4px 0 8px 12px" }}>
                {SHOP_CATEGORIES.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    style={{
                      fontFamily: "var(--font)",
                      fontSize: 13,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--grey-hover)",
                      textDecoration: "none",
                      padding: "10px 0",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              className="mobile-menu-item"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
              onClick={() => setMobileSubOpen(mobileSubOpen === "sell" ? null : "sell")}
              aria-expanded={mobileSubOpen === "sell"}
            >
              Sell <ChevronIcon open={mobileSubOpen === "sell"} />
            </button>
            {mobileSubOpen === "sell" && (
              <div style={{ display: "flex", flexDirection: "column", padding: "4px 0 8px 12px" }}>
                {SELL_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    style={{
                      fontFamily: "var(--font)",
                      fontSize: 13,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--grey-hover)",
                      textDecoration: "none",
                      padding: "10px 0",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/shop?type=rent" className="mobile-menu-item" onClick={closeMobileMenu} style={{ display: "block" }}>
              Rent
            </Link>
            <Link href="/resources" className="mobile-menu-item" onClick={closeMobileMenu} style={{ display: "block" }}>
              Resources
            </Link>
          </div>

          <div style={{ marginTop: 32 }}>
            <CountrySelector selected={country} onSelect={(cty) => setCountry(cty.code)} />
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
