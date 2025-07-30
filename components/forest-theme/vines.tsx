// components/forest-theme/vines.tsx

"use client";

import React, { useState, useEffect } from "react";
import { VineGeneratorProps, VineDecorationsProps } from "@/types/decorative";
import { generateSideVines } from "@/data/vine-configs";
import { cn } from "@/lib/utils";

// Remove React.FC - better TypeScript inference
export function VineGenerator({ vines, className = "" }: VineGeneratorProps) {
  // Empty state - no vines to render
  if (!vines || vines.length === 0) {
    return null;
  }

  return <VineGeneratorContent vines={vines} className={className} />;
}

export const VineDecorations = React.forwardRef<
  HTMLDivElement,
  VineDecorationsProps
>(({ side }, ref) => {
  return <VineDecorationsContent side={side} ref={ref} />;
});

VineDecorations.displayName = "VineDecorations";

// ===== Main Content Components =====

function VineGeneratorContent({
  vines,
  className,
}: {
  vines: VineGeneratorProps["vines"];
  className: string;
}) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {vines.map((vine, index) => (
        <VineElement key={index} vine={vine} />
      ))}
    </div>
  );
}

const VineDecorationsContent = React.forwardRef<
  HTMLDivElement,
  { side: "left" | "right" }
>(({ side }, ref) => {
  const [documentHeight, setDocumentHeight] = useState("100vh");

  useEffect(() => {
    const updateHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setDocumentHeight(`${height}px`);
    };

    // Initial height
    updateHeight();

    // Update on resize and DOM changes
    window.addEventListener("resize", updateHeight);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const containerStyles = {
    width: "13vw",
    willChange: "transform",
    height: documentHeight,
    [side]: "0px",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 z-5 pointer-events-none",
        // Responsive widths
        "w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 2xl:w-[300px]",
        // Responsive opacity
        "opacity-30 md:opacity-30 lg:opacity-40 xl:opacity-40"
      )}
      style={containerStyles}
    >
      {/* Mobile vines */}
      <div className="sm:hidden h-full">
        <VineGenerator vines={generateSideVines(side, "mobile")} />
      </div>

      {/* Tablet vines */}
      <div className="hidden sm:block lg:hidden h-full">
        <VineGenerator vines={generateSideVines(side, "tablet")} />
      </div>

      {/* Desktop vines */}
      <div className="hidden lg:block h-full">
        <VineGenerator vines={generateSideVines(side, "desktop")} />
      </div>
    </div>
  );
});

VineDecorationsContent.displayName = "VineDecorationsContent";

// ===== Sub Components =====

function VineElement({ vine }: { vine: VineGeneratorProps["vines"][0] }) {
  // Build transform string more cleanly
  const transforms = [
    `rotate(${vine.rotate})`,
    `scale(${vine.scale})`,
    vine.scaleX && "scaleX(-1)",
    vine.scaleY && "scaleY(-1)",
  ]
    .filter(Boolean)
    .join(" ");

  const style: React.CSSProperties = {
    position: "absolute",
    width: vine.width,
    height: vine.height,
    backgroundImage: "var(--vine-decoration)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: vine.opacity,
    transform: transforms,
    // Use object spread for cleaner conditional properties
    ...(vine.top !== undefined && { top: vine.top }),
    ...(vine.left !== undefined && { left: vine.left }),
    ...(vine.right !== undefined && { right: vine.right }),
    ...(vine.bottom !== undefined && { bottom: vine.bottom }),
  };

  return <div style={style} aria-hidden="true" />;
}
