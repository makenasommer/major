"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_PARTNERS_TEMPLATE, // add this export to @/lib/emailjs — see note below
} from "@/lib/emailjs";

const empty = { firstName: "", lastName: "", email: "", affiliation: "", message: "" };

export default function PartnersContactForm() {
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const setField = (k) => (e) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (!fields.firstName.trim())   e.firstName   = "field required";
    if (!fields.lastName.trim())    e.lastName    = "field required";
    if (!fields.email.trim())       e.email       = "field required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "valid email required";
    if (!fields.affiliation.trim()) e.affiliation = "field required";
    if (!fields.message.trim())     e.message     = "field required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_PARTNERS_TEMPLATE,
        {
          first_name:  fields.firstName,
          last_name:   fields.lastName,
          email:       fields.email,
          affiliation: fields.affiliation,
          message:     fields.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      alert("Something went wrong: please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return <p style={{ fontSize: 12, textAlign: "center" }}>Thanks: we&rsquo;ll be in touch soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
      <div>
        <input placeholder="First name" value={fields.firstName} onChange={setField("firstName")} style={inputStyle} />
        {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
      </div>
      <div>
        <input placeholder="Last name" value={fields.lastName} onChange={setField("lastName")} style={inputStyle} />
        {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
      </div>
      <div>
        <input placeholder="EMAIL" value={fields.email} onChange={setField("email")} style={{ ...inputStyle, textTransform: "uppercase" }} />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>
      <div>
        <input placeholder="Affiliation" value={fields.affiliation} onChange={setField("affiliation")} style={inputStyle} />
        {errors.affiliation && <p style={errorStyle}>{errors.affiliation}</p>}
      </div>
      <div>
        <textarea placeholder="Message" value={fields.message} onChange={setField("message")} rows={4} style={inputStyle} />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}
      </div>

      <button type="submit" className="btn-major" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font)",
  fontSize: 12,
  border: "1px solid var(--black)",
  padding: 12,
  background: "transparent",
};

const errorStyle = { fontSize: 10, color: "#b00020", marginTop: 4 };
