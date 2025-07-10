// components/decorative/vines.tsx
import React from "react";
import { generateSideVines } from "@/data/vine-configs";
import { VineGeneratorProps, VineDecorationsProps } from "@/types/decorative";
import { cn } from "@/lib/utils";

export const VineGenerator: React.FC<VineGeneratorProps> = ({
  vines,
  className = "",
}) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {vines.map((vine, index) => {
        let transform = `rotate(${vine.rotate}) scale(${vine.scale})`;
        if (vine.scaleX) transform += " scaleX(-1)";
        if (vine.scaleY) transform += " scaleY(-1)";

        const style: React.CSSProperties = {
          position: "absolute",
          width: vine.width,
          height: vine.height,
          backgroundImage: "var(--vine-decoration)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: vine.opacity,
          transform,
        };

        // Add positioning
        if (vine.top) style.top = vine.top;
        if (vine.left) style.left = vine.left;
        if (vine.right) style.right = vine.right;
        if (vine.bottom) style.bottom = vine.bottom;

        return <div key={index} style={style} />;
      })}
    </div>
  );
};

export const VineDecorations = React.forwardRef<
  HTMLDivElement,
  VineDecorationsProps
>(({ side }, ref) => {
  const sideVines = generateSideVines(side);

  return (
    <div
      ref={ref}
      className={`fixed ${side}-0 top-0 h-full z-5 pointer-events-none`}
      style={{
        width: "300px",
        willChange: "transform",
      }}
    >
      <VineGenerator vines={sideVines} />
    </div>
  );
});

VineDecorations.displayName = "VineDecorations";
