// lib/parallax.ts - Optimized Version
import type React from "react";

export function setupParallaxEffect(
  backgroundRef: React.RefObject<HTMLDivElement>,
  leftVinesRef: React.RefObject<HTMLDivElement>,
  rightVinesRef: React.RefObject<HTMLDivElement>
): () => void {
  let ticking = false;

  const updateParallaxPositions = () => {
    if (
      backgroundRef.current &&
      leftVinesRef.current &&
      rightVinesRef.current
    ) {
      const scrollY = window.scrollY;
      const parallaxY = scrollY * -0.5;

      // Use transform for all elements (better performance than backgroundPosition)
      backgroundRef.current.style.transform = `translateY(${parallaxY}px)`;
      leftVinesRef.current.style.transform = `translateY(${parallaxY}px)`;
      rightVinesRef.current.style.transform = `translateY(${parallaxY}px)`;
    }
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallaxPositions);
      ticking = true;
    }
  };

  // Only run on scroll events, not continuously
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
