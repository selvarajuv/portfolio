// components/sections/project/project-section.tsx

"use client";

import { Button } from "@/components/ui/button";
import WorkBox from "@/components/sections/project/project-box";
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProjectSection() {
  const { projects, loading, error } = useProject();

  // Get featured project
  const featuredProject = projects.find((project) => project.featured);

  // Get non-featured projects
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <section id="work" className="section-spacing px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <WorkDescription />
          <FeaturedProject
            project={featuredProject}
            loading={loading}
            error={error}
          />
        </div>
        <ProjectGrid
          projects={regularProjects}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}

function WorkDescription() {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
      >
        My
        <br />
        Work
      </h1>
      <p className="mb-8 text-lg text-gray-300 leading-relaxed">
        Deployed scalable travel, event and telemedicine web and hybrid mobile
        apps using React SPA and PWA. Collaborated in 140+ projects with 50+
        clients all around the world. I am also interested in data analytics and
        visualization.
      </p>
    </div>
  );
}

interface FeaturedProjectProps {
  project?: any;
  loading: boolean;
  error: string | null;
}

function FeaturedProject({ project, loading, error }: FeaturedProjectProps) {
  if (loading) {
    return (
      <div className="flex flex-col">
        <p className="text-gray-400 mb-4">Featured Project</p>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            Loading featured project...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <p className="text-gray-400 mb-4">Featured Project</p>
        <div className="text-center py-12">
          <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col">
        <p className="text-gray-400 mb-4">Featured Project</p>
        <div className="text-center py-12">
          <div className="text-gray-400">No featured project set</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="text-gray-400 mb-4">Featured Project</p>
      <div className="relative mb-6 overflow-hidden rounded-lg">
        <Image
          src={project.cardImage || "/placeholder-project.png"}
          alt={project.title}
          width={500}
          height={300}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">{project.title}</h2>
        <Button
          className={cn(
            "w-fit text-white",
            "bg-[var(--forest-dark)] hover:bg-[var(--navbar-hover-color)]"
          )}
        >
          View Project
        </Button>
      </div>
    </div>
  );
}

interface ProjectGridProps {
  projects: any[];
  loading: boolean;
  error: string | null;
}

function ProjectGrid({ projects, loading, error }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between gap-16 mt-16">
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
