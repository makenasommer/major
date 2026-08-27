"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_CONTACT_TEMPLATE,
} from "@/lib/emailjs";

const empty = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  university: "",
  reason: "",
  message: "",
};

export default function ContactPopup({ onClose }) {
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!fields.firstName.trim())  e.firstName  = "field required";
    if (!fields.lastName.trim())   e.lastName   = "field required";
    if (!fields.email.trim())      e.email      = "field required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "valid email required";
    if (!fields.university.trim()) e.university = "field required";
    if (!fields.reason.trim())     e.reason     = "field required";
    if (!fields.message.trim())    e.message    = "field required";
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
          username:   fields.username,
          email:      fields.email,
          university: fields.university,
          reason:     fields.reason,
          message:    fields.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      alert("Something went wrong: please try again.");
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
          <p className="success-msg">message sent: we&apos;ll get back to you shortly.</p>
        ) : (
          <>
            <h2>Contact</h2>

            <label>first name</label>
            <input value={fields.firstName} onChange={setField("firstName")} />
            {errors.firstName && <p className="field-error">{errors.firstName}</p>}

            <label>last name</label>
            <input value={fields.lastName} onChange={setField("lastName")} />
            {errors.lastName && <p className="field-error">{errors.lastName}</p>}

            <label>username (optional)</label>
            <input value={fields.username} onChange={setField("username")} />

            <label>email</label>
            <input type="email" value={fields.email} onChange={setField("email")} />
            {errors.email && <p className="field-error">{errors.email}</p>}

            <label>university</label>
            <input value={fields.university} onChange={setField("university")} />
            {errors.university && <p className="field-error">{errors.university}</p>}

            <label>reason for contact</label>
            <input value={fields.reason} onChange={setField("reason")} />
            {errors.reason && <p className="field-error">{errors.reason}</p>}

            <label>message</label>
            <textarea value={fields.message} onChange={setField("message")} />
            {errors.message && <p className="field-error">{errors.message}</p>}

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
