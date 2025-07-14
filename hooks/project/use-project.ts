// hooks/use-project.ts

import { useState, useEffect } from "react";
import { ProjectItem } from "@/types/project";
import { getProjectFromNotion } from "@/lib/project";

export function useProject() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjectFromNotion();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return { projects, loading, error };
}
