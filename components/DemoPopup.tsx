"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_DEMO_TEMPLATE,
} from "@/lib/emailjs";

interface Props {
  onClose: () => void;
}

interface Fields {
  firstName: string;
  lastName: string;
  university: string;
  email: string;
}

const empty: Fields = { firstName: "", lastName: "", university: "", email: "" };

export default function DemoPopup({ onClose }: Props) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const validate = () => {
    const e: Partial<Fields> = {};
    if (!fields.firstName.trim()) e.firstName = "field required";
    if (!fields.lastName.trim())  e.lastName  = "field required";
    if (!fields.university.trim()) e.university = "field required";
    if (!fields.email.trim())     e.email     = "field required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "valid email required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_DEMO_TEMPLATE,
        {
          first_name: fields.firstName,
          last_name:  fields.lastName,
          university: fields.university,
          email:      fields.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      alert("Something went wrong — please try again.");
      setStatus("idle");
    }
  };

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: undefined }));
  };

  return (
    <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="popup">
        <button className="popup-close" onClick={onClose}>×</button>

        {status === "done" ? (
          <p className="success-msg">
            request received — we&apos;ll be in touch soon.
          </p>
        ) : (
          <>
            <h2>Book a Demo</h2>

            <label>first name</label>
            <input value={fields.firstName} onChange={set("firstName")} />
            {errors.firstName && <p className="field-error">{errors.firstName}</p>}

            <label>last name</label>
            <input value={fields.lastName} onChange={set("lastName")} />
            {errors.lastName && <p className="field-error">{errors.lastName}</p>}

            <label>university</label>
            <input value={fields.university} onChange={set("university")} />
            {errors.university && <p className="field-error">{errors.university}</p>}

            <label>email</label>
            <input type="email" value={fields.email} onChange={set("email")} />
            {errors.email && <p className="field-error">{errors.email}</p>}

            <button
              className="popup-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "sending..." : "book"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
