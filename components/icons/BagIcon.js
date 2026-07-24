export default function BagIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8V6.5a4 4 0 0 1 8 0V8" />
      <rect x="4.5" y="8" width="15" height="12" rx="0.5" />
    </svg>
  );
}
