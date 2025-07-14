//lib/project.ts

import { ProjectItem } from "@/types/project";

export async function getProjectFromNotion(): Promise<ProjectItem[]> {
  const response = await fetch("/api/project");

  if (!response.ok) {
    throw new Error("Failed to fetch project data");
  }

  return response.json();
}
