import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Peer-to-peer creative workspace and production studio sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}