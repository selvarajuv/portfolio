// types/project.ts

export type WorkBoxSize = "default" | "large";

export type WorkBoxDimensions = {
  container: { width: string; height: string };
  inner: { width: string; height: string };
  image: { height: string };
  bottom: { height: number };
  text: {
    title: string;
    description: string;
  };
};

export type WorkBoxProps = {
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  topContent?: string;
  bottomContent?: string;
  hoverContent?: string;
  slug?: string;
  size?: WorkBoxSize;
  clickable?: boolean;
};

export type ProjectNavigationProps = {
  currentProjectId: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  client: string;
  year: string;
  technologies?: string[];
  images: string[];
  challenges: string[];
  outcomes: string[];
  topContent?: string;
  bottomContent?: string;
  hoverContent?: string;
  imageUrl?: string;
  featured: boolean;
  large: boolean;
};
