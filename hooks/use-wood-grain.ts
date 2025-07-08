import type { CSSProperties } from "react";

interface WoodGrainOptions {
  opacity?: number;
  backgroundSize?: string;
  className?: string;
}

interface WoodGrainOverlay {
  overlayProps: {
    className: string;
    style: CSSProperties;
  };
}

export function useWoodGrain({
  opacity = 0.07,
  backgroundSize = "600px",
  className = "absolute inset-0 rounded-xl",
}: WoodGrainOptions = {}): WoodGrainOverlay {
  return {
    overlayProps: {
      className,
      style: {
        backgroundImage: "url('/wood-grain-pattern.png')",
        backgroundSize,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        opacity,
      },
    },
  };
}
