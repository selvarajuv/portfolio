// components/sections/project/project-grid.tsx

"use client";

// Components
import ProjectBox from "@/components/sections/project/project-box";

// Types
import { ProjectItem } from "@/types/project";

type ProjectGridProps = {
  projects: ProjectItem[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  // Empty state
  if (!projects || projects.length === 0) {
    return <ProjectGridEmpty />;
  }

  // Success state
  return <ProjectGridContent projects={projects} />;
}

// ===== State Components =====

function ProjectGridEmpty() {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <p className="text-gray-400 text-lg text-center">
        No projects available at the moment.
      </p>
    </div>
  );
}

// ===== Main Content Component =====

function ProjectGridContent({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-12 md:gap-20">
      {projects.map((project) => (
        <ProjectBox
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
