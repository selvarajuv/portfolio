export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
  logo?: string;
}

export async function getExperienceFromNotion(): Promise<ExperienceItem[]> {
  const response = await fetch("/api/experience");

  if (!response.ok) {
    throw new Error("Failed to fetch experience data");
  }

  return response.json();
}
