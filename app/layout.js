import "./globals.css";
import { Instrument_Sans } from "next/font/google";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata = {
  title: "major",
  description: "major — campus marketplace",
  icons: {
    icon: "/major-logo.png",
  },
  openGraph: {
    title: "major",
    description: "major — campus marketplace",
    images: [
      {
        url: "/major-logo.png",
        width: 1200,
        height: 630,
        alt: "major logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
