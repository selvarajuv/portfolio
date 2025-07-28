// components/sections/skill/skill-icon.tsx

"use client";

import React, { useState } from "react";
import SvgIcon from "@/components/sections/skill/svg-icon";
import { SkillIconProps } from "@/types/skill";

export default function SkillIcon({
  name,
  iconPath,
  color,
  size = 96,
  isHovered = false,
  isRowHovered = false,
}: SkillIconProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);
  const hasValidIcon = iconPath && iconPath.trim() !== "" && !imageError;

  // Icon container styles
  const containerStyles = {
    width: size,
    height: size,
    backgroundColor: isHovered
      ? "var(--surface-primary-hover)"
      : "var(--surface-primary)",
    padding: "var(--spacing-compact)",
    boxShadow: isHovered
      ? "var(--shadow-inset-strong-sm)"
      : "var(--shadow-inset-subtle-sm)",
    transition: "var(--transition-default)",
  };

  // Icon filter styles
  const iconStyles = {
    filter: isHovered ? `drop-shadow(0 2px 8px ${color}40)` : "none",
    transition: "var(--transition-fast)",
  };

  // Fallback text styles
  const fallbackStyles = {
    color: color,
    fontSize: `${Math.max(12, size / 8)}px`,
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className="relative flex items-center justify-center rounded-xl overflow-hidden"
      style={containerStyles}
    >
      {/* Texture pattern overlay */}
      <div className="texture-overlay-sm" />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center rounded-lg overflow-hidden">
        {hasValidIcon ? (
          <SvgIcon
            src={iconPath}
            alt={`${name} icon`}
            style={iconStyles}
            onError={handleImageError}
          />
        ) : (
          // Fallback text display
          <div
            className="flex items-center justify-center text-center font-bold"
            style={fallbackStyles}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
