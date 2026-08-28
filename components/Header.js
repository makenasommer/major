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

export default function Header({ campusName = "UCLA" }) {
  const { user } = useAuth();
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
        {/* Left: Shop / Sell / Rent / Resources */}
        <nav ref={navRef} style={{ display: "flex", gap: 28, position: "relative" }}>
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

          <Link href="/shop?type=rent" className="nav-word">Rent</Link>
          <Link href="/resources" className="nav-word">Resources</Link>
        </nav>

        {/* Center: Logo, absolutely positioned so it's centered regardless of left/right content width */}
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

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
