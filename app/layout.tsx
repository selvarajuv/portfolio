// app/layout.tsx

import type React from "react";
import type { Metadata } from "next";

import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

const font = Instrument_Sans({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Vichu's Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
