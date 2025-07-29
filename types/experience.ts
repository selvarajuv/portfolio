// types/experience.ts

import { ReactNode } from "react";

export type ExperienceItem = {
  id: string;
  title: ReactNode;
  company: string;
  period: string;
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
  logo?: string;
};
