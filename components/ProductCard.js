import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ listing }) {
  const isRental = listing.type === "rent";

  return (
    <Link
      href={`/shop/${listing.id}`}
      style={{ textDecoration: "none", color: "var(--black)", display: "block" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "var(--light-grey)" }}>
        <Image
          src={listing.images[0]}
          alt={listing.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        {isRental && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "rgba(0,0,0,0.85)",
              color: "var(--white)",
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 8px",
            }}
          >
            Rent
          </span>
        )}
        {listing.sale && !isRental && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "var(--white)",
              color: "var(--black)",
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "4px 8px",
              border: "1px solid var(--black)",
            }}
          >
            Sale
          </span>
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        <p style={{ fontSize: 11, marginBottom: 4 }}>{listing.name}</p>
        <p style={{ fontSize: 11, color: "var(--grey-hover)" }}>
          ${(listing.price / 100).toFixed(2)}
          {isRental && " / day"}
        </p>
        {(listing.sellerUsername || listing.sellerName) && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <div style={{ position: "relative", width: 16, height: 16, borderRadius: "50%", overflow: "hidden", background: "var(--light-grey)", flexShrink: 0 }}>
              {listing.sellerPhotoURL && (
                <Image src={listing.sellerPhotoURL} alt={listing.sellerUsername || listing.sellerName} fill style={{ objectFit: "cover" }} />
              )}
            </div>
            <span style={{ fontSize: 10, color: "var(--grey-hover)" }}>
              {listing.sellerUsername || listing.sellerName}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
