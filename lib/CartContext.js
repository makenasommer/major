"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

/**
 * Wrap the whole app in <CartProvider> (done in app/layout.js) so every
 * page/component shares the exact same cart state, instead of each page
 * having its own private copy. Persists to localStorage so the cart also
 * survives a page refresh.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("major_cart");
    if (stored) setItems(JSON.parse(stored));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return; // don't overwrite storage with the initial empty state before we've loaded it
    window.localStorage.setItem("major_cart", JSON.stringify(items));
  }, [items, loaded]);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  function addItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, subtotal, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider> (check app/layout.js)");
  }
  return ctx;
}
