"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DemoPopup from "@/components/DemoPopup";
import ContactPopup from "@/components/ContactPopup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [popup, setPopup] = useState(null);

  return (
    <>
      {popup === "demo"    && <DemoPopup    onClose={() => setPopup(null)} />}
      {popup === "contact" && <ContactPopup onClose={() => setPopup(null)} />}

      {/* ADD THE CLASS RIGHT HERE */}
      <div className="page-fade-in" style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>

        <Header />

        {/* Center Section: Logo + Photos */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0" }}>
          
          {/* Main Logo */}
          <Link href="/about">
            <Image
              src="/major-logo.png" 
              alt="major"
              width={220}
              height={86}
              style={{ objectFit: "contain", cursor: "pointer", marginBottom: "40px" }}
              priority
            />
          </Link>

          {/* The Two Side-by-Side Photos */}
          <div style={{ position: "relative", width: "180px", display: "flex", flexDirection: "column", gap: "12px" }}>
            
            {/* Photo 1: Shop */}
            <div style={{ position: "relative", width: "180px", height: "135px" }}>
              <Link href="/shop">
                <Image
                  src="/images/home-photo-1.png"
                  alt="shop game day"
                  fill
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              </Link>
              <div style={{ position: "absolute", bottom: "10px", left: "8px", fontSize: "5px", color: "#fff", pointerEvents: "none" }}>
                SHOP GAME DAY
              </div>
            </div>

            {/* Photo 2: Sell */}
            <div style={{ position: "relative", width: "180px", height: "118px" }}>
              <Link href="/sell/new">
                <Image
                  src="/images/home-photo-2.png"
                  alt="sell before graduation"
                  fill
                  style={{ objectFit: "cover", cursor: "pointer" }}
                />
              </Link>
              <div style={{ position: "absolute", bottom: "10px", right: "8px", fontSize: "5px", color: "#fff", pointerEvents: "none" }}>
                SELL BEFORE GRADUATION
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </>
  );
}
