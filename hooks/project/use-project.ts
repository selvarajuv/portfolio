// hooks/use-projects.ts

import { useState, useEffect } from "react";
import { ProjectItem } from "@/types/project";
import { getProjectsFromNotion } from "@/lib/project";

export function useProject() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjectsFromNotion();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects data");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
}
