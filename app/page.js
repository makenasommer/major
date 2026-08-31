"use client";
import { useState } from "react";
import DemoPopup from "@/components/DemoPopup";
import ContactPopup from "@/components/ContactPopup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoverCarousel from "@/components/CoverCarousel";

export default function Home() {
  const [popup, setPopup] = useState(null);

  return (
    <>
      {popup === "demo" && <DemoPopup onClose={() => setPopup(null)} />}
      {popup === "contact" && <ContactPopup onClose={() => setPopup(null)} />}

      <div className="page-fade-in">
        <Header />
        <CoverCarousel />
        <Footer />
      </div>
    </>
  );
}
