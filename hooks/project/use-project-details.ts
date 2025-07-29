// hooks/use-project-details.ts

import { useEffect, useState } from "react";
import { useProject } from "@/hooks/project/use-project";
import { ProjectItem } from "@/types/project";

type ProjectDetailsState = {
  project: ProjectItem | null;
  loading: boolean;
  error: string | null;
};

export function useProjectDetails(slug: string): ProjectDetailsState {
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProject();
  const [project, setProject] = useState<ProjectItem | null>(null);

  // Find the project by slug when projects are loaded
  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find((p) => p.id === slug);
      setProject(foundProject || null);
    }
  }, [projects, slug]);

  return {
    project,
    loading: projectsLoading,
    error: projectsError,
  };
}
