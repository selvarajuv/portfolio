// types/decorative.ts

import type { CSSProperties } from "react";

export type VineConfig = {
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
};

export type VineElementProps = {
  vine: VineConfig;
};

export type VineGeneratorProps = {
  vines: VineConfig[];
  className?: string;
};

export type VineDecorationsProps = {
  side: "left" | "right";
};

export type WoodGrainBackgroundProps = {
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
  backgroundSize?: string;
};

export type WoodenBoxProps = {
  children: React.ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export type WoodGrainOptions = {
  opacity?: number;
  backgroundSize?: string;
  className?: string;
};

export type WoodGrainOverlay = {
  overlayProps: {
    className: string;
    style: CSSProperties;
  };
};
