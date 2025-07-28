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
  return (
    <div
      ref={ref}
      className={cn("texture-overlay-full", className)}
      style={{
        willChange: "background-position",
        ...style,
      }}
    />
  );
});

WoodGrainBackground.displayName = "WoodGrainBackground";
export default WoodGrainBackground;
