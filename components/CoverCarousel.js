"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Swap these image paths out anytime for real campus photos.
const SLIDES = [
  { src: "/images/home-photo-1.png", alt: "Shop Game Day", href: "/shop?category=merch" },
  { src: "/images/home-photo-2.png", alt: "Dorm Essentials", href: "/shop?category=dorm-essentials" },
  { src: "/images/about-portrait.png", alt: "Lab Equipment", href: "/shop?category=lab-equipment" },
  { src: "/images/about-bottom.png", alt: "Campus Life", href: "/shop" },
];

export default function CoverCarousel() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  function handlePointerDown(e) {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }

  function handlePointerMove(e) {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - delta;
  }

  function endDrag() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }

  return (
    <div style={{ background: "#F3F1EE", padding: "48px 36px" }}>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          cursor: "grab",
          scrollbarWidth: "none",
        }}
        className="cover-carousel-track"
      >
        {SLIDES.map((slide) => (
          <Link
            href={slide.href}
            key={slide.src}
            draggable={false}
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: "min(340px, 78vw)",
              aspectRatio: "3 / 4",
              scrollSnapAlign: "start",
              overflow: "hidden",
              display: "block",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 78vw, 340px"
              style={{ objectFit: "cover", pointerEvents: "none" }}
              priority
            />
          </Link>
        ))}
      </div>

      {/* Hide scrollbar in webkit browsers without hiding it in the CSS var scope */}
      <style jsx>{`
        .cover-carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
