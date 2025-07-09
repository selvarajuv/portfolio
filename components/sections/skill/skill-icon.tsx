// components/sections/skills/skill-icon.tsx

"use client";

import type React from "react";
import { useState } from "react";
import { SkillIconProps } from "@/types/skill";
import SvgIcon from "./svg-icon";
import { useWoodGrain } from "@/hooks/use-wood-grain";

const SkillIcon: React.FC<SkillIconProps> = ({
  name,
  iconPath,
  color,
  size = 96,
  isHovered = false,
  isRowHovered = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const { overlayProps } = useWoodGrain({
    opacity: 0.05,
    backgroundSize: "300px",
  });

  // Fallback to text if image fails to load
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300"
      style={{
        width: size,
        height: size,
        backgroundColor: isHovered ? "#8B4513" : "#3d1f0f",
        padding: "8px",
        boxShadow: isHovered
          ? `
            inset 0 0 20px rgba(0, 0, 0, 0.9),
            inset 0 0 40px rgba(0, 0, 0, 0.7),
            inset 0 0 60px rgba(0, 0, 0, 0.4)
          `
          : `
            inset 0 0 15px rgba(0, 0, 0, 0.8),
            inset 0 0 30px rgba(0, 0, 0, 0.6),
            inset 0 0 50px rgba(0, 0, 0, 0.3)
          `,
      }}
    >
      {/* Wood grain pattern overlay */}
      <div {...overlayProps} />

      {/* Icon container */}
      <div
        className="relative z-10 flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          width: size - 16,
          height: size - 16,
          backgroundColor: "#f8f9fa",
          padding: "8px",
        }}
      >
        {!imageError ? (
          <SvgIcon
            src={iconPath}
            alt={`${name} icon`}
            size={size - 32}
            style={{
              filter: isHovered ? `drop-shadow(0 2px 8px ${color}40)` : "none",
              transition: "filter 0.3s ease",
            }}
            onError={handleImageError}
          />
        ) : (
          // Fallback text display
          <div
            className="flex items-center justify-center text-center font-bold"
            style={{
              color: color,
              fontSize: `${Math.max(12, size / 8)}px`,
              width: "100%",
              height: "100%",
            }}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillIcon;
