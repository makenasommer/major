"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import useMessages from "@/lib/useMessages";
import useAuth from "@/lib/AuthContext";

function NewThreadRedirect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { startThread } = useMessages();
  const { isLoggedIn, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (!isLoggedIn) {
      router.replace("/account/login");
      return;
    }

    const listingId = searchParams.get("listing");
    const listingName = searchParams.get("listingName") || "Listing";
    const sellerId = searchParams.get("seller");
    const sellerName = searchParams.get("sellerName") || "Seller";

    if (!listingId || !sellerId) {
      router.replace("/shop");
      return;
    }

    const threadId = startThread({ listingId, listingName, sellerId, sellerName });
    router.replace(`/messages/${threadId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, isLoggedIn]);

  return <p style={{ padding: 40, fontSize: 12, textAlign: "center" }}>Opening conversation...</p>;
}

export default function NewMessagePage() {
  return (
    <Suspense fallback={null}>
      <NewThreadRedirect />
    </Suspense>
  );
}
