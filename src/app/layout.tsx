import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthyBag — Eat Healthy for Less",
  description:
    "Research-backed meal plans from discounted eBag.bg groceries. Save money, eat better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body className="font-body bg-cream text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
