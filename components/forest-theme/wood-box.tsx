// components/forest-theme/wood-box.tsx

"use client";

import React from "react";
import { VineGenerator } from "@/components/forest-theme/vines";
import { WoodenBoxProps } from "@/types/decorative";
import { vineFrame } from "@/data/vine-configs";
import { cn } from "@/lib/utils";

// Extended props type for vine configuration
interface ExtendedWoodenBoxProps extends WoodenBoxProps {
  showVines?: boolean;
  vineConfig?: typeof vineFrame;
}

export default function WoodenBox({
  children,
  className = "",
  width = "auto",
  height = "auto",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  showVines = true,
  vineConfig = vineFrame,
}: ExtendedWoodenBoxProps) {
  return (
    <WoodenBoxContent
      className={className}
      width={width}
      height={height}
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      showVines={showVines}
      vineConfig={vineConfig}
    >
      {children}
    </WoodenBoxContent>
  );
}

// ===== Main Content Component =====

function WoodenBoxContent({
  children,
  className,
  width,
  height,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  showVines,
  vineConfig,
}: ExtendedWoodenBoxProps) {
  return (
    <div className="relative" style={{ width, height }}>
      {/* Vine decorations */}
      {showVines && vineConfig && <WoodenBoxVines vineConfig={vineConfig} />}

      {/* Wooden box */}
      <WoodenBoxContainer
        className={className}
        isHovered={isHovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </WoodenBoxContainer>
    </div>
  );
}

// ===== Sub Components =====

function WoodenBoxVines({ vineConfig }: { vineConfig: typeof vineFrame }) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none overflow-hidden",
        // Responsive vine offsets
        "[--vine-offset:-15px] sm:[--vine-offset:-20px]",
        "md:[--vine-offset:-25px] lg:[--vine-offset:-25px]"
      )}
      style={{
        top: "var(--vine-offset)",
        left: "var(--vine-offset)",
        right: "var(--vine-offset)",
        bottom: "var(--vine-offset)",
      }}
    >
      <div className="w-full h-full origin-center">
        <VineGenerator vines={vineConfig} />
      </div>
    </div>
  );
}

function WoodenBoxContainer({
  children,
  className,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const boxStyles = {
    backgroundColor: isHovered
      ? "var(--surface-primary-hover)"
      : "var(--surface-primary)",
    padding: "var(--spacing-comfortable)",
    boxShadow: isHovered
      ? "var(--shadow-inset-strong)"
      : "var(--shadow-inset-subtle)",
    transition: "var(--transition-default)",
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl relative z-10 w-full h-full",
        className
      )}
      style={boxStyles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Texture pattern overlay */}
      <div className="texture-overlay" aria-hidden="true" />

      {/* Content container */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
