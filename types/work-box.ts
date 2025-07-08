export type WorkBoxSize = "default" | "large";

export interface WorkBoxDimensions {
  container: { width: string; height: string };
  inner: { width: string; height: string };
  image: { height: string };
  bottom: { height: number };
  text: {
    title: string;
    description: string;
  };
}

export interface WorkBoxProps {
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  topContent?: string;
  bottomContent?: string;
  hoverContent?: string;
  slug?: string;
  size?: WorkBoxSize;
  clickable?: boolean;
}
