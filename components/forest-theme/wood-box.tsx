// components/decorative/wood-box.tsx
"use client";

import type React from "react";
import { WoodenBoxProps } from "@/types/decorative";
import { useWoodGrain } from "@/hooks/use-wood-grain";
import { cn } from "@/lib/utils";

const WoodenBox: React.FC<WoodenBoxProps> = ({
  children,
  className = "",
  width = "auto",
  height = "auto",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { overlayProps } = useWoodGrain();

  return (
    <div
      className={cn("overflow-hidden rounded-xl", className)}
      style={{
        width,
        height,
        backgroundColor: isHovered
          ? "var(--forest-medium)"
          : "var(--forest-dark)",
        padding: "var(--forest-padding)",
        position: "relative",
        boxShadow: isHovered
          ? "var(--wood-box-shadow-hover)"
          : "var(--wood-box-shadow-default)",
        transition: "var(--forest-transition)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Wood grain pattern overlay - decorative background */}
      <div {...overlayProps} />

      {/* Content - takes full available space after padding */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default WoodenBox;
