// hooks/use-wood-grain.ts

import { WoodGrainOptions, WoodGrainOverlay } from "@/types/decorative";

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
