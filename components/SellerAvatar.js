import Image from "next/image";

export default function SellerAvatar({ photoURL, name, size = 32 }) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: "var(--light-grey)",
        flexShrink: 0,
      }}
    >
      {photoURL && <Image src={photoURL} alt={name || "Seller"} fill style={{ objectFit: "cover" }} />}
    </div>
  );
}
