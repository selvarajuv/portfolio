// components/sections/skill/svg-icon.tsx

import React from "react";
import { SvgIconProps } from "@/types/skill";

export default function SvgIcon({
  src,
  alt,
  size = 96,
  className = "",
  style = {},
  onError,
}: SvgIconProps) {
  // Base image styles
  const imageStyles = {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain" as const,
    ...style,
  };

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={imageStyles}
      onError={onError}
      loading="lazy"
    />
  );
}
