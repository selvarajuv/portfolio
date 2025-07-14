"use client";

import type React from "react";
import { useState } from "react";
import SvgIcon from "@/components/sections/skill/svg-icon";
import { useWoodGrain } from "@/hooks/use-wood-grain";
import { SkillIconProps } from "@/types/skill";

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

  // Fallback to text if image fails to load or iconPath is empty
  const handleImageError = () => {
    setImageError(true);
  };

  // Check if we have a valid iconPath from Notion
  const hasValidIcon = iconPath && iconPath.trim() !== "" && !imageError;

  return (
    <div
      className="relative flex items-center justify-center rounded-xl overflow-hidden"
      style={{
        width: size,
        height: size,
        backgroundColor: isHovered
          ? "var(--forest-medium)"
          : "var(--forest-dark)",
        padding: "var(--forest-padding-small)",
        boxShadow: isHovered
          ? "var(--wood-box-shadow-small-hover)"
          : "var(--wood-box-shadow-small)",
        transition: "var(--forest-transition)",
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
          padding: "var(--forest-padding-small)",
        }}
      >
        {hasValidIcon ? (
          <SvgIcon
            src={iconPath}
            alt={`${name} icon`}
            size={size - 32}
            style={{
              filter: isHovered ? `drop-shadow(0 2px 8px ${color}40)` : "none",
              transition: "var(--forest-transition-fast)",
            }}
            onError={handleImageError}
          />
        ) : (
          // Fallback text display for missing icons or errors
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
