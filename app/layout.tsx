import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Real Estate Pro",
    template: "%s | Real Estate Pro",
  },
  description:
    "Find your perfect property with Real Estate Pro. Explore premium properties for sale and rent in prime locations.",
  keywords: [
    "real estate",
    "properties",
    "houses for sale",
    "houses for rent",
    "property listings",
    "Pakistan real estate",
  ],
  authors: [{ name: "Real Estate Pro" }],
  creator: "Real Estate Pro",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}