// types/skill.ts

export type SkillItem = {
  id: string;
  name: string;
  iconPath: string;
  color: string;
};

export type SkillIconProps = {
  name: string;
  iconPath: string;
  color: string;
  size?: number;
  isHovered?: boolean;
  isRowHovered?: boolean;
};

export type SvgIconProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
};
