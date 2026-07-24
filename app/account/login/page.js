"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await login(email, password);
      router.push("/account");
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
          Log In
        </h1>

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
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 12 }}
          />
          {error && <p style={{ fontSize: 10, color: "#b00020" }}>{error}</p>}
          <button type="submit" className="btn-major" disabled={status === "sending"}>
            {status === "sending" ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ fontSize: 11, color: "var(--grey-hover)", textAlign: "center", marginTop: 20 }}>
          Don&rsquo;t have an account?{" "}
          <Link href="/account/signup" style={{ color: "var(--black)", textDecoration: "underline" }}>
            Sign up
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

function friendlyError(err) {
  const code = err?.code || "";
  if (code.includes("wrong-password") || code.includes("invalid-credential")) return "Incorrect email or password.";
  if (code.includes("user-not-found")) return "No account found with that email.";
  if (code.includes("too-many-requests")) return "Too many attempts — please wait a moment and try again.";
  return err.message || "Something went wrong — please try again.";
}
