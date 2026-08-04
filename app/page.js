"use client";
import { useState } from "react";
import Link from "next/link";
import DemoPopup from "@/components/DemoPopup";
import ContactPopup from "@/components/ContactPopup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverCarousel from "@/components/CoverCarousel";
import TopBanner from "@/components/TopBanner";

const CATEGORIES = [
  { label: "Dorm Essentials", href: "/shop?category=dorm-essentials" },
  { label: "Merch", href: "/shop?category=merch" },
  { label: "Lab Equipment", href: "/shop?category=lab-equipment" },
  { label: "Art Materials", href: "/shop?category=art-materials" },
  { label: "Books", href: "/shop?category=books" },
  { label: "Small Business on Campus", href: "/shop?category=small-business" },
  { label: "Services", href: "/shop?category=services" },
  { label: "Rentals", href: "/shop?type=rent" },
];

export default function Home() {
  const [popup, setPopup] = useState(null);

  return (
    <>
      {popup === "demo" && <DemoPopup onClose={() => setPopup(null)} />}
      {popup === "contact" && <ContactPopup onClose={() => setPopup(null)} />}

      <div className="page-fade-in">
        <TopBanner />
        <Header />

        <CoverCarousel />

        {/* Shop by Category */}
        <section style={{ padding: "60px 36px", textAlign: "center" }}>
          <h2 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 32 }}>
            Shop by Category
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            {CATEGORIES.map((c) => (
              <Link key={c.label} href={c.href} className="btn-major-outline" style={{ textDecoration: "none" }}>
                {c.label}
              </Link>
            ))}
          </div>
        </section>

        {/* About Major */}
        <section style={{ padding: "60px 36px", textAlign: "center", background: "var(--light-grey)" }}>
          <h2 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
            About Major
          </h2>
          <p style={{ fontSize: 12, color: "var(--grey-hover)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            {/* PLACEHOLDER: add your About Major copy here */}
            Add your About Major copy here.
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
}
