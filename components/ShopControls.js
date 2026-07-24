"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const CATEGORIES = [
  { value: "dorm-essentials", label: "Dorm Essentials" },
  { value: "merch", label: "Merch" },
  { value: "lab-equipment", label: "Lab Equipment" },
  { value: "art-materials", label: "Art Materials" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
];

const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "used", label: "Used" },
];

export default function ShopControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const currentCategory = searchParams.get("category") || "";
  const currentType = searchParams.get("type") || "";
  const currentCondition = searchParams.get("condition") || "";
  const currentSale = searchParams.get("sale") === "true";
  const currentSort = searchParams.get("sort") || "relevance";

  return (
    <aside style={{ width: 180, flexShrink: 0, display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 10 }}>
          Category
        </p>
        <button
          className="footer-word"
          style={{ display: "block", marginBottom: 6, fontWeight: currentCategory === "" ? 600 : 400 }}
          onClick={() => updateParam("category", null)}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            className="footer-word"
            style={{ display: "block", marginBottom: 6, fontWeight: currentCategory === c.value ? 600 : 400 }}
            onClick={() => updateParam("category", c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 10 }}>
          Buy or Rent
        </p>
        {["", "buy", "rent"].map((t) => (
          <button
            key={t || "all"}
            className="footer-word"
            style={{ display: "block", marginBottom: 6, fontWeight: currentType === t ? 600 : 400 }}
            onClick={() => updateParam("type", t || null)}
          >
            {t === "" ? "All" : t === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 10 }}>
          Condition
        </p>
        <button
          className="footer-word"
          style={{ display: "block", marginBottom: 6, fontWeight: currentCondition === "" ? 600 : 400 }}
          onClick={() => updateParam("condition", null)}
        >
          All
        </button>
        {CONDITIONS.map((c) => (
          <button
            key={c.value}
            className="footer-word"
            style={{ display: "block", marginBottom: 6, fontWeight: currentCondition === c.value ? 600 : 400 }}
            onClick={() => updateParam("condition", c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 10 }}>
          Sale
        </p>
        <button
          className="footer-word"
          style={{ display: "block", fontWeight: currentSale ? 600 : 400 }}
          onClick={() => updateParam("sale", currentSale ? null : "true")}
        >
          {currentSale ? "✓ Sale Items Only" : "Sale Items Only"}
        </button>
      </div>

      <div>
        <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--grey-hover)", marginBottom: 10 }}>
          Sort
        </p>
        <select
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          style={{
            fontFamily: "var(--font)",
            fontSize: 11,
            border: "1px solid var(--black)",
            borderRadius: 0,
            padding: "6px 8px",
            background: "var(--white)",
            width: "100%",
          }}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
}
