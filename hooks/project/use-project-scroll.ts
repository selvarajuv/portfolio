// hooks/use-project-scroll.ts

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/lib/scroll";

export function useProjectScroll(slug: string) {
  const router = useRouter();

  // Handle scroll restoration and reset when slug changes
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTop();
    const timeoutId = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timeoutId);
  }, [slug]);

  // Handle back navigation with scroll to work section
  const handleBackClick = () => {
    sessionStorage.setItem("scrollToWork", "true");
    router.push("/");
  };

  return { handleBackClick };
}
