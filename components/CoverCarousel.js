"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Swap these images out anytime for real cover photos - just replace the
// file paths below. Update `href` if these should link somewhere else.
const SLIDES = [
  { src: "/images/home-photo-1.png", alt: "Shop Game Day", title: "Shop Game Day", href: "/shop?category=merch" },
  { src: "/images/home-photo-2.png", alt: "Just moving in? Dorm Essentials", title: "Just moving in? Dorm Essentials", href: "/shop?category=dorm-essentials" },
  { src: "/images/about-portrait.png", alt: "For the unexpected projects", title: "For the unexpected projects", href: "/shop?category=lab-equipment" },
];

export default function CoverCarousel() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      setIndex((i) => (deltaX < 0 ? (i + 1) % SLIDES.length : (i - 1 + SLIDES.length) % SLIDES.length));
    }
    touchStartX.current = null;
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "70vh", minHeight: 420, overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <Link
          href={slide.href}
          key={slide.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 0.8s var(--ease-out-expo)",
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <Image src={slide.src} alt={slide.alt} fill sizes="100vw" style={{ objectFit: "cover" }} priority={i === 0} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "flex-end",
              padding: "0 0 70px 36px",
            }}
          >
            <p style={{ color: "var(--white)", fontSize: 18, textTransform: "uppercase", letterSpacing: "0.04em", maxWidth: 420 }}>
              {slide.title}
            </p>
          </div>
        </Link>
      ))}

      {/* Dot navigation, no arrow icons */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "1px solid var(--white)",
              background: i === index ? "var(--white)" : "transparent",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
