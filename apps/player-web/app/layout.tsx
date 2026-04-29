import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@goal-connect/ui/globals.css";

export const metadata: Metadata = {
  title: "Goal Connect · Players",
  description:
    "Young Ethiopian players connecting with scouts—shared design system across apps.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
