import React from "react";
import VineGenerator from "./vine-generator";
import { generateSideVines } from "@/data/vine-configs";

interface VineDecorationsProps {
  side: "left" | "right";
}

const VineDecorations = React.forwardRef<HTMLDivElement, VineDecorationsProps>(
  ({ side }, ref) => {
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
  }
);

VineDecorations.displayName = "VineDecorations";

export default VineDecorations;
