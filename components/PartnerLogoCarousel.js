"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/partnersData";

export default function PartnerLogoCarousel() {
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
    <div style={{ padding: "80px 36px" }}>
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        style={{
          display: "flex",
          gap: 64,
          overflowX: "auto",
          scrollSnapType: "x proximity",
          cursor: "grab",
          scrollbarWidth: "none",
          alignItems: "center",
        }}
        className="partner-logo-track"
      >
        {PARTNERS.map((partner, i) => (
          <Link
            href={partner.href}
            key={`${partner.name}-${i}`}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className="partner-logo-link"
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: 160,
              height: 100,
              scrollSnapAlign: "start",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="160px"
              style={{ objectFit: "contain", pointerEvents: "none" }}
            />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .partner-logo-track::-webkit-scrollbar {
          display: none;
        }
        .partner-logo-link {
          transition: transform 0.25s var(--ease-out-expo, ease);
        }
        .partner-logo-link:hover {
          transform: scale(1.12);
        }
      `}</style>
    </div>
  );
}
