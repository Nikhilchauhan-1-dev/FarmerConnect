import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KisanSetu",
  description: "AI-powered farm-to-market platform connecting farmers directly with buyers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
