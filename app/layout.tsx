import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spill & Bites — Neo-Fast Food",
  description:
    "Ayam goreng raksasa berlumur mozzarella dan saus signature. Spill keju-nya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="font-display bg-white text-ink antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <FloatingChat />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
