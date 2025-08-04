// lib/project.ts

import { ProjectItem } from "@/types/project";

let projectsData: ProjectItem[] = [];

try {
  projectsData = require("@/data/projects.json");
} catch (error) {
  console.warn("Projects data not found. Run npm run download-images first.");
}

export async function getProjectsFromNotion(): Promise<ProjectItem[]> {
  return projectsData;
}
