import type React from "react";

interface VineConfig {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  opacity: number;
  rotate: string;
  scale: string;
  scaleX?: boolean;
  scaleY?: boolean;
}

interface VineGeneratorProps {
  vines: VineConfig[];
  className?: string;
}

const VineGenerator: React.FC<VineGeneratorProps> = ({
  vines,
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {vines.map((vine, index) => {
        let transform = `rotate(${vine.rotate}) scale(${vine.scale})`;
        if (vine.scaleX) transform += " scaleX(-1)";
        if (vine.scaleY) transform += " scaleY(-1)";

        const style: React.CSSProperties = {
          position: "absolute",
          width: vine.width,
          height: vine.height,
          backgroundImage: "url('/vine-decoration.png')",
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

export default VineGenerator;
