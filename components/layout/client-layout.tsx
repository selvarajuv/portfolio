"use client";
import type React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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

  return <>{children}</>;
}
