"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useMessages from "@/lib/useMessages";
import useAuth from "@/lib/AuthContext";

export default function MessagesInboxPage() {
  const { threads } = useMessages();
  const { isLoggedIn, ready } = useAuth();

  if (!ready) return null;

  return (
    <div className="page-fade-in">
      <Header />

      <main style={{ maxWidth: 560, margin: "50px auto", padding: "0 24px" }}>
        <h1 style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 24 }}>
          Messages
        </h1>

        {!isLoggedIn && (
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
            <a href="/account/login" style={{ color: "var(--black)", textDecoration: "underline" }}>Log in</a> to see your messages.
          </p>
        )}

        {isLoggedIn && threads.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
            No conversations yet: message a seller from any listing to start one.
          </p>
        )}

        {isLoggedIn && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {threads.map((thread) => {
              const lastMessage = thread.messages[thread.messages.length - 1];
              return (
                <Link
                  key={thread.id}
                  href={`/messages/${thread.id}`}
                  style={{
                    textDecoration: "none",
                    color: "var(--black)",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <p style={{ fontSize: 12 }}>{thread.sellerName}</p>
                  <p style={{ fontSize: 10, color: "var(--grey-hover)" }}>Re: {thread.listingName}</p>
                  {lastMessage && (
                    <p style={{ fontSize: 11, color: "var(--grey-hover)", marginTop: 4 }}>
                      {lastMessage.text.slice(0, 60)}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
