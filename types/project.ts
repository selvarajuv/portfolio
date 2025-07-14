// types/project.ts

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
  cardImage?: string;
  featured: boolean;
  large: boolean;
};

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
