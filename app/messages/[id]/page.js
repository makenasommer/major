"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useMessages from "@/lib/useMessages";

export default function ThreadPage() {
  const { id } = useParams();
  const { getThread, sendMessage } = useMessages();
  const [text, setText] = useState("");

  const thread = getThread(id);

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(id, text.trim());
    setText("");
  }

  if (!thread) {
    return (
      <div className="page-fade-in">
        <Header />
        <main style={{ maxWidth: 560, margin: "50px auto", padding: "0 24px" }}>
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>Conversation not found.</p>
          <Link href="/messages" className="footer-word">Back to Messages</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 560, margin: "50px auto", padding: "0 24px" }}>
        <Link href="/messages" className="footer-word" style={{ display: "inline-block", marginBottom: 20 }}>
          Back to Messages
        </Link>

        <h1 style={{ fontSize: 15, textTransform: "uppercase", letterSpacing: "0.04em" }}>{thread.sellerName}</h1>
        <p style={{ fontSize: 10, color: "var(--grey-hover)", marginBottom: 24 }}>
          Re: <Link href={`/shop/${thread.listingId}`} style={{ color: "var(--grey-hover)" }}>{thread.listingName}</Link>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, minHeight: 120 }}>
          {thread.messages.length === 0 ? (
            <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>No messages yet: say hello.</p>
          ) : (
            thread.messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "buyer" ? "flex-end" : "flex-start",
                  background: msg.sender === "buyer" ? "var(--black)" : "var(--light-grey)",
                  color: msg.sender === "buyer" ? "var(--white)" : "var(--black)",
                  padding: "8px 12px",
                  maxWidth: "75%",
                  fontSize: 12,
                }}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            style={{ flex: 1, fontFamily: "var(--font)", fontSize: 12, border: "1px solid var(--black)", padding: 10 }}
          />
          <button type="submit" className="btn-major">Send</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
