import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Scroll The Fund — Swipe Through Startup Funding Rounds",
  description:
    "Discover the latest startup funding rounds. Scroll through seed, Series A, B, C rounds and more. Bookmark, share, and explore.",
  openGraph: {
    title: "Scroll The Fund",
    description: "Swipe through the latest startup funding rounds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
