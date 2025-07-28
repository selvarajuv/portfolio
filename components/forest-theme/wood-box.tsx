// components/forest-theme/wood-box.tsx
"use client";

import React from "react";
import { WoodenBoxProps } from "@/types/decorative";
import { VineGenerator } from "@/components/forest-theme/vines";
import { profileFrameVines } from "@/data/vine-configs";
import { cn } from "@/lib/utils";

export default function WoodenBox({
  children,
  className = "",
  width = "auto",
  height = "auto",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  showVines = true,
  vineConfig = profileFrameVines,
}: WoodenBoxProps & { showVines?: boolean; vineConfig?: any[] }) {
  // Consistent style object for readability
  const boxStyles = {
    backgroundColor: isHovered
      ? "var(--surface-primary-hover)"
      : "var(--surface-primary)",
    padding: "var(--spacing-comfortable)",
    position: "relative" as const,
    boxShadow: isHovered
      ? "var(--shadow-inset-strong)"
      : "var(--shadow-inset-subtle)",
    transition: "var(--transition-default)",
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Vine decorations */}
      {showVines && (
        <div
          className={cn(
            "absolute pointer-events-none overflow-hidden",
            "[--vine-offset:-20px] sm:[--vine-offset:-15px] md:[--vine-offset:-20px] lg:[--vine-offset:-20px]"
          )}
          style={{
            top: "var(--vine-offset)",
            left: "var(--vine-offset)",
            right: "var(--vine-offset)",
            bottom: "var(--vine-offset)",
            // // // Temporary debug border
            // border: "2px dashed blue",
            // // Also add a background to see the container
            // backgroundColor: "rgba(255, 0, 0, 0.1)",
          }}
        >
          <div className="w-full h-full scale-[1] xs:scale-[1] sm:scale-[1] md:scale-[1] lg:scale-[1] xl:scale-[1] origin-center">
            <VineGenerator vines={vineConfig} />
          </div>
        </div>
      )}

      {/* Wooden box */}
      <div
        className={cn(
          "overflow-hidden rounded-xl relative z-10 w-full h-full",
          className
        )}
        style={boxStyles}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Texture pattern overlay using CSS utility class */}
        <div className="texture-overlay" />

        {/* Content container */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
