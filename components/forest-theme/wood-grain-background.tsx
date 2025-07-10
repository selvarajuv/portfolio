// components/decorative/wood-grain-background.tsx
import React from "react";
import { WoodGrainBackgroundProps } from "@/types/decorative";
import { useWoodGrain } from "@/hooks/use-wood-grain";

const WoodGrainBackground = React.forwardRef<
  HTMLDivElement,
  WoodGrainBackgroundProps
>(({ opacity, backgroundSize, className = "", style = {} }, ref) => {
  const { overlayProps } = useWoodGrain({
    opacity,
    backgroundSize,
    className: `fixed inset-0 z-0 ${className}`,
  });

  return (
    <div
      ref={ref}
      {...overlayProps}
      style={{
        ...overlayProps.style,
        willChange: "background-position",
        ...style,
      }}
    />
  );
});

WoodGrainBackground.displayName = "WoodGrainBackground";
export default WoodGrainBackground;
