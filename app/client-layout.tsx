// app/client-layout.tsx

"use client";

import type React from "react";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable scroll restoration globally
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // For project pages, immediately scroll to top
    if (pathname.startsWith("/projects/")) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
