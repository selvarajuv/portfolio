import React from "react";
import VineGenerator from "./vine-generator";
import { generateSideVines } from "@/data/vine-configs";

interface VineProps {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  opacity: number;
  rotate: string;
  scale: string;
  scaleX?: boolean;
  scaleY?: boolean;
}

const Vine: React.FC<VineProps> = ({
  top,
  left,
  right,
  width,
  height,
  opacity,
  rotate,
  scale,
  scaleX,
  scaleY,
}) => {
  let transform = `rotate(${rotate}) scale(${scale})`;

  if (scaleX) transform += " scaleX(-1)";
  if (scaleY) transform += " scaleY(-1)";

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        right,
        width,
        height,
        backgroundImage: "url('/vine-decoration.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        opacity,
        transform,
      }}
    />
  );
};

interface VineDecorationsProps {
  side: "left" | "right";
  className?: string;
}

const VineDecorations = React.forwardRef<HTMLDivElement, VineDecorationsProps>(
  ({ side, className = "" }, ref) => {
    const sideVines = generateSideVines(side);

    return (
      <div
        ref={ref}
        className={`fixed ${side}-0 top-0 h-full z-5 pointer-events-none ${className}`}
        style={{
          width: "300px",
          willChange: "transform",
        }}
      >
        <VineGenerator vines={sideVines} />
      </div>
    );
  }
);

VineDecorations.displayName = "VineDecorations";

export default VineDecorations;
