// components/sections/project/project-grid.tsx

import WorkBox from "@/components/sections/project/project-box";
import { ProjectItem } from "@/types/project";

type ProjectGridProps = {
  projects: ProjectItem[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16">
      {projects.map((project) => (
        <WorkBox
          key={project.id}
          size={project.large ? "large" : "default"}
          topContent={project.topContent}
          bottomContent={project.bottomContent}
          hoverContent={project.hoverContent}
          imageUrl={project.cardImage}
          slug={project.id}
        />
      ))}
    </div>
  );
}
