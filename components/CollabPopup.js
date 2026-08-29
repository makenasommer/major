"use client";
import PartnersContactForm from "@/components/PartnersContactForm";

export default function CollabPopup({ onClose }) {
  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup">
        <button className="popup-close" onClick={onClose}>×</button>
        <h2>Collab</h2>
        <PartnersContactForm />
      </div>
    </div>
  );
}
