"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useAuth from "@/lib/AuthContext";
import { createListing } from "@/lib/listings";

const CATEGORIES = [
  { value: "dorm-essentials", label: "Dorm Essentials" },
  { value: "merch", label: "Merch" },
  { value: "lab-equipment", label: "Lab Equipment" },
  { value: "art-materials", label: "Art Materials" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
];

function NewListingForm() {
  const { user, isLoggedIn, isVerified, ready } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "rent" ? "rent" : "sell";

  const [type, setType] = useState(initialType); // "sell" | "rent"
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [condition, setCondition] = useState("used");
  const [sale, setSale] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [durations, setDurations] = useState("4,8");
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && !isLoggedIn) router.push("/account/login");
  }, [ready, isLoggedIn, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !price || imageFiles.length === 0) {
      setError("Please fill out all fields and add at least one photo.");
      return;
    }

    setSubmitting(true);
    try {
      const priceCents = Math.round(parseFloat(price) * 100);
      const rentalOptions =
        type === "rent"
          ? {
              durations: durations.split(",").map((d) => parseInt(d.trim(), 10)).filter(Boolean),
              depositAmount: Math.round(parseFloat(depositAmount || "0") * 100),
            }
          : null;

      const listingId = await createListing({
        sellerId: user.id,
        sellerName: user.name,
        sellerCampus: user.campus,
        name: name.trim(),
        description: description.trim(),
        price: priceCents,
        category,
        condition: type === "sell" ? condition : null,
        type: type === "rent" ? "rent" : "buy",
        sale,
        rentalOptions,
        imageFiles,
      });

      router.push(`/shop/${listingId}`);
    } catch (err) {
      console.error("Create listing error:", err);
      setError("Something went wrong creating your listing — please try again.");
      setSubmitting(false);
    }
  }

  if (!ready || !isLoggedIn) return null;

  if (!isVerified) {
    return (
      <main style={{ maxWidth: 400, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--grey-hover)" }}>
          Please verify your email before creating a listing.
        </p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 480, margin: "50px auto", padding: "0 24px 80px" }}>
      <h1 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center", marginBottom: 28 }}>
        Create a Listing
      </h1>

      <div style={{ display: "flex", gap: 0, marginBottom: 24, border: "1px solid var(--black)" }}>
        {["sell", "rent"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            style={{
              flex: 1,
              padding: "10px 0",
              background: type === t ? "var(--black)" : "transparent",
              color: type === t ? "var(--white)" : "var(--black)",
              border: "none",
              fontFamily: "var(--font)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              cursor: "pointer",
            }}
          >
            List to {t === "sell" ? "Sell" : "Rent"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {type === "sell" && (
          <select value={condition} onChange={(e) => setCondition(e.target.value)} style={inputStyle}>
            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
          </select>
        )}

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder={type === "rent" ? "Price per day ($)" : "Price ($)"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />

        {type === "rent" && (
          <>
            <input
              placeholder="Rental durations in days, comma-separated (e.g. 4,8)"
              value={durations}
              onChange={(e) => setDurations(e.target.value)}
              style={inputStyle}
            />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Refundable deposit ($)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              style={inputStyle}
            />
          </>
        )}

        {type === "sell" && (
          <label style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={sale} onChange={(e) => setSale(e.target.checked)} />
            Mark as a sale item
          </label>
        )}

        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 8 }}>
            Photos
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImageFiles(Array.from(e.target.files))}
            style={{ fontSize: 12 }}
          />
          {imageFiles.length > 0 && (
            <p style={{ fontSize: 10, color: "var(--grey-hover)", marginTop: 6 }}>{imageFiles.length} photo(s) selected</p>
          )}
        </div>

        {error && <p style={{ fontSize: 11, color: "#b00020" }}>{error}</p>}

        <button type="submit" className="btn-major" disabled={submitting}>
          {submitting ? "Creating Listing..." : "Create Listing"}
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font)",
  fontSize: 12,
  border: "1px solid var(--black)",
  padding: 12,
  background: "transparent",
};

export default function NewListingPage() {
  return (
    <div className="page-fade-in">
      <Header />
      <Suspense fallback={null}>
        <NewListingForm />
      </Suspense>
      <Footer />
    </div>
  );
}
