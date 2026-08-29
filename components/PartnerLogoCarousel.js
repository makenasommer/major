"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/partnersData";

// Duplicated so the auto-scroll can loop seamlessly without a visible jump.
const LOGOS = [...PARTNERS, ...PARTNERS];

const AUTO_SCROLL_SPEED = 0.4; // pixels per animation frame — slow, steady drift

export default function PartnerLogoCarousel() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const isPaused = useRef(false);
  const rafId = useRef(null);
  const halfWidth = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    halfWidth.current = track.scrollWidth / 2;

    function step() {
      if (!isPaused.current && track) {
        track.scrollLeft += AUTO_SCROLL_SPEED;
        if (track.scrollLeft >= halfWidth.current) {
          track.scrollLeft -= halfWidth.current;
        }
      }
      rafId.current = requestAnimationFrame(step);
    }

    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function handlePointerDown(e) {
    isDragging.current = true;
    isPaused.current = true;
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
    isPaused.current = false;
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
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { if (!isDragging.current) isPaused.current = false; }}
        style={{
          display: "flex",
          gap: 64,
          overflowX: "auto",
          cursor: "grab",
          scrollbarWidth: "none",
          alignItems: "center",
        }}
        className="partner-logo-track"
      >
        {LOGOS.map((partner, i) => (
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
