"use client";
import { useState, useEffect, useCallback } from "react";

/**
 * PLACEHOLDER — replace with real messaging backend (e.g., Firestore) later.
 * A thread can only be created from a listing (see spec doc — Messaging),
 * then lives permanently in the inbox so either side can revisit it.
 */
export default function useMessages() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("major_mock_threads");
    if (stored) setThreads(JSON.parse(stored));
  }, []);

  function persist(updated) {
    setThreads(updated);
    window.localStorage.setItem("major_mock_threads", JSON.stringify(updated));
  }

  // Finds an existing thread for this listing+seller, or creates a new one.
  // Only callable starting from a listing — never a bare "message this user" action.
  function startThread({ listingId, listingName, sellerId, sellerName }) {
    const existing = threads.find((t) => t.listingId === listingId && t.sellerId === sellerId);
    if (existing) return existing.id;

    const thread = {
      id: `thread_${Date.now()}`,
      listingId,
      listingName,
      sellerId,
      sellerName,
      messages: [],
      createdAt: new Date().toISOString(),
    };
    persist([thread, ...threads]);
    return thread.id;
  }

  const getThread = useCallback((id) => threads.find((t) => t.id === id) || null, [threads]);

  function sendMessage(threadId, text) {
    const updated = threads.map((t) =>
      t.id === threadId
        ? { ...t, messages: [...t.messages, { sender: "buyer", text, at: new Date().toISOString() }] }
        : t
    );
    persist(updated);
  }

  return { threads, startThread, getThread, sendMessage };
}
