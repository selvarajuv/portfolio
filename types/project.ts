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
  technologyNames?: string[];
  images: string[];
  projectLink?: string;
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

export type ProjectBoxSize = "default" | "large";

export type ProjectBoxDimensions = {
  container: {
    width: string;
    height: string;
    aspectRatio?: string;
  };
  inner: {
    padding: string;
  };
  image: {
    aspectRatio: string;
  };
  bottom: {
    flex: string;
  };
  text: {
    title: string;
    description: string;
  };
};
