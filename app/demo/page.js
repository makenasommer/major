"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_DEMO_TEMPLATE } from "@/lib/emailjs";

const empty = { firstName: "", lastName: "", university: "", email: "" };

export default function DemoPage() {
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const setField = (k) => (e) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate() {
    const e = {};
    if (!fields.firstName.trim()) e.firstName = "field required";
    if (!fields.lastName.trim()) e.lastName = "field required";
    if (!fields.university.trim()) e.university = "field required";
    if (!fields.email.trim()) e.email = "field required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = "valid email required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_DEMO_TEMPLATE,
        {
          first_name: fields.firstName,
          last_name: fields.lastName,
          university: fields.university,
          email: fields.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("done");
    } catch {
      alert("Something went wrong: please try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 460, margin: "60px auto", padding: "0 24px 80px" }}>
        <h1 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: 32 }}>
          Book a Demo
        </h1>

        {status === "done" ? (
          <p style={{ fontSize: 12, textAlign: "center" }}>Thanks: we&rsquo;ll be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <input required placeholder="First name" value={fields.firstName} onChange={setField("firstName")} style={inputStyle} />
              {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
            </div>
            <div>
              <input required placeholder="Last name" value={fields.lastName} onChange={setField("lastName")} style={inputStyle} />
              {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
            </div>
            <div>
              <input required placeholder="University" value={fields.university} onChange={setField("university")} style={inputStyle} />
              {errors.university && <p style={errorStyle}>{errors.university}</p>}
            </div>
            <div>
              <input required type="email" placeholder="EMAIL" value={fields.email} onChange={setField("email")} style={{ ...inputStyle, textTransform: "uppercase" }} />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            <button type="submit" className="btn-major" disabled={status === "sending"}>
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
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
