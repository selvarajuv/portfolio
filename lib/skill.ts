//lib/skill.ts

import { SkillItem } from "@/types/skill";

export async function getSkillsFromNotion(): Promise<SkillItem[]> {
  const response = await fetch("/api/skill");

  if (!response.ok) {
    throw new Error("Failed to fetch skills data");
  }

  return response.json();
}
