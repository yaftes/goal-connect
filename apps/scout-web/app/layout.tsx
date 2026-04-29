import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@goal-connect/ui/globals.css";

export const metadata: Metadata = {
  title: "Goal Connect · Scouts",
  description:
    "Scouts discover youth talent—reuse the shared Goal Connect component library.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
