"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE,
} from "@/lib/emailjs";

const empty = { firstName: "", lastName: "", phone: "", email: "", reason: "" };

export default function ContactPopup({ onClose }) {
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!fields.firstName.trim()) e.firstName = "field required";
    if (!fields.lastName.trim())  e.lastName  = "field required";
    if (!fields.phone.trim())     e.phone     = "field required";
    if (!fields.email.trim())     e.email     = "field required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "valid email required";
    if (!fields.reason.trim())    e.reason    = "field required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE,
        {
          first_name: fields.firstName,
          last_name:  fields.lastName,
          phone:      fields.phone,
          email:      fields.email,
          reason:     fields.reason,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      alert("Something went wrong — please try again.");
      setStatus("idle");
    }
  };

  const setField = (k) => (e) => {
    setFields(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: undefined }));
  };

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup">
        <button className="popup-close" onClick={onClose}>×</button>

        {status === "done" ? (
          <p className="success-msg">message sent — we&apos;ll get back to you shortly.</p>
        ) : (
          <>
            <h2>Contact</h2>

            <label>first name</label>
            <input value={fields.firstName} onChange={setField("firstName")} />
            {errors.firstName && <p className="field-error">{errors.firstName}</p>}

            <label>last name</label>
            <input value={fields.lastName} onChange={setField("lastName")} />
            {errors.lastName && <p className="field-error">{errors.lastName}</p>}

            <label>phone number</label>
            <input type="tel" value={fields.phone} onChange={setField("phone")} />
            {errors.phone && <p className="field-error">{errors.phone}</p>}

            <label>email</label>
            <input type="email" value={fields.email} onChange={setField("email")} />
            {errors.email && <p className="field-error">{errors.email}</p>}

            <label>reason for contact</label>
            <textarea value={fields.reason} onChange={setField("reason")} />
            {errors.reason && <p className="field-error">{errors.reason}</p>}

            <button
              className="popup-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "sending..." : "send"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
