// lib/experience.ts

import { ExperienceItem } from "@/types/experience";

let experienceData: ExperienceItem[] = [];

try {
  experienceData = require("@/data/experience.json");
} catch (error) {
  console.warn("Experience data not found. Run npm run download-images first.");
}

export async function getExperienceFromNotion(): Promise<ExperienceItem[]> {
  return experienceData;
}
