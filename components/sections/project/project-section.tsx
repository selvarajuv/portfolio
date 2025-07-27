// components/sections/project/project-section.tsx

"use client";

import WorkDescription from "@/components/sections/project/project-description";
import FeaturedProject from "@/components/sections/project/featured-project";
import ProjectGrid from "@/components/sections/project/project-grid";
import { useProjectSections } from "@/hooks/project/use-project-sections";

export default function ProjectSection() {
  const { featuredProject, regularProjects, loading, error } =
    useProjectSections();

  return (
    <section id="work" className="section-spacing px-4 md:px-8">
      <div className="mx-auto" style={{ width: "65vw" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <WorkDescription />
          <FeaturedProjectSection
            project={featuredProject}
            loading={loading}
            error={error}
          />
        </div>
        <ProjectGridSection
          projects={regularProjects}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}

function FeaturedProjectSection({
  project,
  loading,
  error,
}: {
  project: ReturnType<typeof useProjectSections>["featuredProject"];
  loading: boolean;
  error: string | null;
}) {
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
    return <div></div>;
  }

  return <FeaturedProject project={project} />;
}

function ProjectGridSection({
  projects,
  loading,
  error,
}: {
  projects: ReturnType<typeof useProjectSections>["regularProjects"];
  loading: boolean;
  error: string | null;
}) {
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

  return <ProjectGrid projects={projects} />;
}
