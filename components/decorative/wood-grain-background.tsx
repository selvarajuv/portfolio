import React from "react";

interface WoodGrainBackgroundProps {
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
}

const WoodGrainBackground = React.forwardRef<
  HTMLDivElement,
  WoodGrainBackgroundProps
>(({ opacity = 0.07, className = "", style = {} }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-0 ${className}`}
      style={{
        backgroundImage: "url('/wood-grain-pattern.png')",
        backgroundSize: "600px",
        backgroundPosition: "center 0",
        backgroundRepeat: "repeat",
        opacity,
        willChange: "background-position",
        ...style,
      }}
    />
  );
});

WoodGrainBackground.displayName = "WoodGrainBackground";

export default WoodGrainBackground;
