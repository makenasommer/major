"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";
import useOrders from "@/lib/useOrders";

export default function AccountPage() {
  const { user, isLoggedIn, isVerified, ready, logout, resendVerificationEmail, updateProfile } = useAuth();
  const { orders } = useOrders();
  const [resent, setResent] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  if (!ready) return null;

  async function handleResend() {
    await resendVerificationEmail();
    setResent(true);
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    await updateProfile({ username: username || user.username, photoFile });
    setSavingProfile(false);
    setEditingProfile(false);
    setPhotoFile(null);
  }

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 640, margin: "60px auto", padding: "0 24px" }}>
        {!isLoggedIn ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, marginBottom: 16 }}>You&rsquo;re not logged in.</p>
            <Link href="/account/login" className="btn-major" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </div>
        ) : !isVerified ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, marginBottom: 16 }}>
              Please verify your email address before continuing: check {user?.email} for the link.
            </p>
            {resent ? (
              <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>Verification email resent.</p>
            ) : (
              <button className="btn-major-outline" onClick={handleResend}>
                Resend Verification Email
              </button>
            )}
            <div style={{ marginTop: 16 }}>
              <button className="footer-word" onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ position: "relative", width: 56, height: 56, borderRadius: "50%", overflow: "hidden", background: "var(--light-grey)" }}>
                  {user.photoURL && (
                    <Image src={user.photoURL} alt={user.username || user.name} fill style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div>
                  <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {user.username || user.name}
                  </h1>
                  <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>{user.campus}</p>
                </div>
              </div>
              <button className="footer-word" onClick={logout}>Log Out</button>
            </div>

            <section>
              {!editingProfile ? (
                <button className="footer-word" onClick={() => { setEditingProfile(true); setUsername(user.username || ""); }}>
                  Edit Profile Picture / Username
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
                  <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 10 }}
                  />
                  <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} style={{ fontSize: 12 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-major" onClick={handleSaveProfile} disabled={savingProfile}>
                      {savingProfile ? "Saving..." : "Save"}
                    </button>
                    <button className="btn-major-outline" onClick={() => setEditingProfile(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </section>

            <section>
              <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 12 }}>
                Order History
              </h2>
              {orders.length === 0 ? (
                <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
                  No orders yet: once checkout is live, orders and rentals will appear here with status tracking.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {orders.map((order) => (
                    <div key={order.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11 }}>Order #{order.id.slice(-6)}</span>
                        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{order.status}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "var(--grey-hover)", marginTop: 4 }}>
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} &middot; ${(order.total / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 12 }}>
                Saved Items
              </h2>
              <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
                Items you save from the Shop page will show up here.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 12 }}>
                Messages
              </h2>
              <Link href="/messages" className="footer-word">View Conversations</Link>
            </section>

            <section>
              <h2 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 12 }}>
                Selling
              </h2>
              <Link href="/account/selling" className="btn-major-outline" style={{ textDecoration: "none", display: "inline-block" }}>
                Go to Seller Dashboard
              </Link>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
