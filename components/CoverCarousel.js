"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({ subsets: ["latin"], weight: ["400", "500"] });

const BASE_SLIDES = [
  {
    src: "/images/ucla-balustrade.jpg",
    alt: "Campus consumption has changed",
    href: "/shop",
    title: "campus consumption has changed",
    description: "",
  },
  {
    src: "/images/columbia-library.jpg",
    alt: "Rent your textbooks",
    href: "/shop?category=books",
    title: "STILL NEED THAT PRE-1700 LIT BOOK?",
    description: "Rent it. Browse the books section.",
  },
  {
    src: "/images/usc-fighton.jpg",
    alt: "Game day merch",
    href: "/shop?category=merch",
    title: "READY FOR GAME DAY?",
    description: "Shop here.",
  },
  {
    src: "/images/yale-plate.png",
    alt: "Move-in essentials",
    href: "/shop?category=dorm-essentials",
    title: "MOVE-IN ESSENTIALS",
    description: "",
  },
  {
    src: "/images/resale-shoe.jpg",
    alt: "Shop secondhand",
    href: "/shop?category=clothing", // adjust if your resale/clothing route differs
    title: "SHOP SECONDHAND. KEEP IT ON CAMPUS.",
    description: "",
  },
  {
    src: "/images/ucla-colonnade.jpg",
    alt: "One student's done is another's dorm essential",
    href: "/shop?category=dorm-essentials",
    title: "ONE STUDENT'S DONE IS ANOTHER'S DORM ESSENTIAL",
    description: "",
  },
  {
    src: "/images/lmu-chapel.jpg",
    alt: "Browse majors",
    href: "/shop", // placeholder — swap once you have a majors/programs page
    title: "MAJOR CURIOUS?",
    description: "Browse here.",
  },
  {
    src: "/images/campus-interior.png",
    alt: "Local donation and e-waste resources",
    href: "/resources", // adjust to your actual resources page route if different
    title: "DONATE LOCAL. RECYCLE SMART.",
    description: "Find e-waste and donation resources near campus.",
  },
];

// Duplicated so the auto-scroll can loop seamlessly without a visible jump.
const SLIDES = [...BASE_SLIDES, ...BASE_SLIDES];
const AUTO_SCROLL_SPEED = 0.4; // pixels per animation frame — slow, steady drift

export default function CoverCarousel() {
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
    // Measure the width of one full set of slides (half the total scrollWidth,
    // since the list is duplicated) so we know when to loop back to 0.
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
    <div style={{ background: "#F3F1EE", padding: "48px 36px" }}>
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
          gap: 24,
          overflowX: "auto",
          cursor: "grab",
          scrollbarWidth: "none",
        }}
        className="cover-carousel-track"
      >
        {SLIDES.map((slide, i) => (
          <Link
            href={slide.href}
            key={`${slide.src}-${i}`}
            draggable={false}
            style={{
              flex: "0 0 auto",
              width: "min(340px, 78vw)",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                overflow: "hidden",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 78vw, 340px"
                style={{ objectFit: "cover", pointerEvents: "none" }}
                priority={i < 4}
              />
            </div>
            <h3
              className={lexendDeca.className}
              style={{
                fontSize: "19px",
                fontWeight: 400,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginTop: 16,
                marginBottom: slide.description ? 8 : 0,
                lineHeight: 1.2,
              }}
            >
              {slide.title}
            </h3>
            {slide.description && (
              <p
                className={lexendDeca.className}
                style={{
                  fontSize: "16px",
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                {slide.description}
              </p>
            )}
          </Link>
        ))}
      </div>
      <style jsx>{`
        .cover-carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
