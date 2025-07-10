// components/layout/client-layout.tsx

"use client";

import type React from "react";
import { useEffect } from "react";
import { ClientLayoutProps } from "@/types/layout";
import { usePathname } from "next/navigation";
import { scrollToTop } from "@/lib/scroll";

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable scroll restoration globally
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // For project pages, immediately scroll to top
    if (pathname.startsWith("/projects/")) {
      scrollToTop();
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return <>{children}</>;
}
