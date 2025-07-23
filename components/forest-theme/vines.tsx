// components/forest-theme/vines.tsx
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
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-0 h-full z-5 pointer-events-none",
        // Responsive widths - much narrower for better content space
        "w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 2xl:w-[300px]",
        // Responsive opacity
        "opacity-30 md:opacity-30 lg:opacity-40 xl:opacity-40"
      )}
      style={{
        width: "13vw",
        willChange: "transform",
        // Explicit positioning using inline styles for reliability
        [side]: "0px",
      }}
    >
      {/* Mobile vines - hidden on larger screens */}
      <div className="sm:hidden">
        <VineGenerator vines={generateSideVines(side, "mobile")} />
      </div>

      {/* Tablet vines - hidden on mobile and desktop */}
      <div className="hidden sm:block lg:hidden">
        <VineGenerator vines={generateSideVines(side, "tablet")} />
      </div>

      {/* Desktop vines - hidden on smaller screens */}
      <div className="hidden lg:block">
        <VineGenerator vines={generateSideVines(side, "desktop")} />
      </div>
    </div>
  );
});

VineDecorations.displayName = "VineDecorations";
