// hooks/use-project-sections.ts

import { useProject } from "@/hooks/project/use-project";
import { ProjectItem } from "@/types/project";

type ProjectSectionsState = {
  featuredProject: ProjectItem | undefined;
  regularProjects: ProjectItem[];
  loading: boolean;
  error: string | null;
};

export function useProjectSections(): ProjectSectionsState {
  const { projects, loading, error } = useProject();

  // Get featured project
  const featuredProject = projects.find((project) => project.featured);

  // Get non-featured projects
  const regularProjects = projects.filter((project) => !project.featured);

  return {
    featuredProject,
    regularProjects,
    loading,
    error,
  };
}
