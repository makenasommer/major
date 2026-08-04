"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";

export default function SignupPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setStatus("sending");
    try {
      await signUp(email, password);
      setStatus("done");
    } catch (err) {
      setError(friendlyError(err));
      setStatus("error");
    }
  }

  return (
    <div className="page-fade-in">
      <Header />
      <main style={{ maxWidth: 360, margin: "60px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 24, textAlign: "center" }}>
          Sign Up
        </h1>

        {status === "done" ? (
          <p style={{ fontSize: 12, textAlign: "center", color: "var(--grey-hover)" }}>
            Account created: check <strong style={{ color: "var(--black)" }}>{email}</strong> for a
            verification link before logging in.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="email"
                placeholder="Campus email address (.edu)"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 12 }}
              />
              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 12 }}
              />
              <input
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 12 }}
              />
              {error && <p style={{ fontSize: 10, color: "#b00020" }}>{error}</p>}
              <button type="submit" className="btn-major" disabled={status === "sending"}>
                {status === "sending" ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p style={{ fontSize: 11, color: "var(--grey-hover)", textAlign: "center", marginTop: 20 }}>
              Already have an account?{" "}
              <Link href="/account/login" style={{ color: "var(--black)", textDecoration: "underline" }}>
                Log in
              </Link>
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("email-already-in-use")) return "An account with that email already exists.";
  if (code.includes("weak-password")) return "Password is too weak: try a longer one.";
  return err.message || "Something went wrong: please try again.";
}
