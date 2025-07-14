// hooks/use-project-details.ts

import { useEffect, useState } from "react";
import { useProject } from "@/hooks/project/use-project";
import { ProjectItem } from "@/types/project";

type ProjectDetailsState = {
  project: ProjectItem | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
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

  // Determine if project is not found (only when not loading and no error)
  const notFound =
    !projectsLoading && !projectsError && projects.length > 0 && !project;

  return {
    project,
    loading: projectsLoading,
    error: projectsError,
    notFound,
  };
}
