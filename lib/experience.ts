//lib/experience.ts

import { ExperienceItem } from "@/types/experience";

export async function getExperienceFromNotion(): Promise<ExperienceItem[]> {
  const response = await fetch("/api/experience");

  if (!response.ok) {
    throw new Error("Failed to fetch experience data");
  }

  return response.json();
}
