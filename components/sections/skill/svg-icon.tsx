// components/sections/skills/svg-icon.tsx

import type React from "react";
import { SvgIconProps } from "@/types/skill";

const SvgIcon: React.FC<SvgIconProps> = ({
  src,
  alt,
  size = 96,
  className = "",
  style = {},
  onError,
}) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        ...style,
      }}
      onError={onError}
      loading="lazy"
    />
  );
};

export default SvgIcon;
