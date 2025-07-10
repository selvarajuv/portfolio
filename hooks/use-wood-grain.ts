// hooks/use-wood-grain.ts
import { WoodGrainOptions, WoodGrainOverlay } from "@/types/decorative";

export function useWoodGrain({
  opacity,
  backgroundSize,
  className = "absolute inset-0 rounded-xl",
}: WoodGrainOptions = {}): WoodGrainOverlay {
  return {
    overlayProps: {
      className,
      style: {
        backgroundImage: "var(--wood-grain-pattern)",
        backgroundSize: backgroundSize || "var(--wood-grain-size)",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        opacity: opacity || "var(--wood-grain-opacity)",
      },
    },
  };
}
