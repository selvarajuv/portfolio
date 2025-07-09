// lib/parallax.ts

import type React from "react";

export function setupParallaxEffect(
  backgroundRef: React.RefObject<HTMLDivElement>,
  leftVinesRef: React.RefObject<HTMLDivElement>,
  rightVinesRef: React.RefObject<HTMLDivElement>
): () => void {
  // Function to update the background position directly in the animation frame
  const updateParallaxPositions = () => {
    if (
      backgroundRef.current &&
      leftVinesRef.current &&
      rightVinesRef.current
    ) {
      // Get current scroll position
      const scrollY = window.scrollY;

      // Apply the parallax effect directly to the DOM elements
      // Using a factor of -0.5 for dramatic movement
      const parallaxY = scrollY * -0.5;

      // Apply to background
      backgroundRef.current.style.backgroundPosition = `center ${parallaxY}px`;

      // Apply same parallax to vines
      leftVinesRef.current.style.transform = `translateY(${parallaxY}px)`;
      rightVinesRef.current.style.transform = `translateY(${parallaxY}px)`;

      // Request the next frame
      requestAnimationFrame(updateParallaxPositions);
    }
  };

  // Start the animation loop
  const animationId = requestAnimationFrame(updateParallaxPositions);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
  };
}
