// types/experience.ts

export type ExperienceCardProps = {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
  logo?: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
  logo?: string;
};
