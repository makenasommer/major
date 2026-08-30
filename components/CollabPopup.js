"use client";
import { useEffect } from "react";
import PartnersContactForm from "@/components/PartnersContactForm";

export default function CollabPopup({ onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="collab-popup-heading">
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>
        <h2 id="collab-popup-heading">Collab</h2>
        <PartnersContactForm />
      </div>
    </div>
  );
}
