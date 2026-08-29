"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerLogoCarousel from "@/components/PartnerLogoCarousel";
import CollabPopup from "@/components/CollabPopup";

export default function PartnersPage() {
  const [showCollab, setShowCollab] = useState(false);

  return (
    <div className="page-fade-in">
      {showCollab && <CollabPopup onClose={() => setShowCollab(false)} />}

      <Header />

      <PartnerLogoCarousel />

      <section
        style={{
          background: "var(--light-grey)",
          padding: "80px 36px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <p style={{ fontSize: 14, maxWidth: 480 }}>
          To become an official partner or collaborate, please contact us using this form.
        </p>
        <button className="btn-major" onClick={() => setShowCollab(true)}>
          Collab
        </button>
      </section>

      <Footer />
    </div>
  );
}
