// components/forest-theme/wood-grain-background.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WoodGrainBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const WoodGrainBackground = React.forwardRef<
  HTMLDivElement,
  WoodGrainBackgroundProps
>(({ className = "", style = {} }, ref) => {
  // Keep the abstraction since it separates the forwardRef logic
  return (
    <WoodGrainBackgroundContent ref={ref} className={className} style={style} />
  );
});

WoodGrainBackground.displayName = "WoodGrainBackground";

export default WoodGrainBackground;

// ===== Main Content Component =====

const WoodGrainBackgroundContent = React.forwardRef<
  HTMLDivElement,
  WoodGrainBackgroundProps
>(({ className, style }, ref) => {
  const backgroundStyles = {
    willChange: "background-position",
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cn("texture-overlay-full", className)}
      style={backgroundStyles}
      aria-hidden="true" // Decorative element
    />
  );
});

WoodGrainBackgroundContent.displayName = "WoodGrainBackgroundContent";
