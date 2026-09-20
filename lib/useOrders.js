"use client";
import { useState, useEffect, useCallback } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/AuthContext";

/**
 * CHANGED: was a PLACEHOLDER writing/reading localStorage only — no real
 * order ever existed anywhere in Firestore. Real orders are now created
 * server-side in app/api/stripe/create-transfers/route.js at the moment
 * a payment is verified. This hook now just READS those real orders for
 * the current user (e.g. for an order-history page) — it no longer
 * creates orders itself; `placeOrder` is gone, since order creation
 * happens server-side, not client-side.
 */
export default function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("buyerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to load orders:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  return { orders, isLoading };
}
