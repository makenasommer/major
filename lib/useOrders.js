"use client";
import { useState, useEffect } from "react";

/**
 * PLACEHOLDER — replace with real order records from your database once
 * Stripe Connect checkout is wired in. Persists to localStorage just so
 * order history is previewable across page loads while building.
 */
export default function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("major_mock_orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  function placeOrder({ items, subtotal, shipping, total }) {
    const order = {
      id: `ord_${Date.now()}`,
      items,
      subtotal,
      shipping,
      total,
      status: "Placed",
      placedAt: new Date().toISOString(),
    };
    const updated = [order, ...orders];
    setOrders(updated);
    window.localStorage.setItem("major_mock_orders", JSON.stringify(updated));
    return order;
  }

  return { orders, placeOrder };
}
