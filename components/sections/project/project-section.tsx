// components/sections/project/project-section.tsx

"use client";

// Components
import WorkDescription from "@/components/sections/project/project-description";
import FeaturedProject from "@/components/sections/project/featured-project";
import ProjectGrid from "@/components/sections/project/project-grid";
import ProjectBox from "@/components/sections/project/project-box";

// Hooks
import { useProjectSections } from "@/hooks/project/use-project-sections";

export default function ProjectSection() {
  const { featuredProject, regularProjects, loading, error } =
    useProjectSections();

  // Loading state
  if (loading) {
    return <ProjectSectionSkeleton />;
  }

  // Error state
  if (error) {
    return <ProjectSectionError error={error} />;
  }

  // Empty state
  if (!regularProjects || regularProjects.length === 0) {
    return <ProjectSectionEmpty />;
  }

  // Success state
  return (
    <ProjectSectionContent
      featuredProject={featuredProject}
      regularProjects={regularProjects}
    />
  );
}

// ===== State Components =====

function ProjectSectionSkeleton() {
  return (
    <section id="work" className="section-spacing">
      <div className="mx-auto w-full p-4 md:px-[15vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* WorkDescription handles its own loading state */}
          <WorkDescription />

          {/* Featured project skeleton placeholder */}
          <div />
        </div>

        {/* Project grid skeleton */}
        <div className="w-full flex flex-wrap justify-center gap-12 md:gap-20">
          {[1, 2, 3].map((index) => (
            <ProjectBoxSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectSectionError({ error }: { error: string }) {
  return (
    <section id="work">
      <div className="mx-auto w-full p-4 md:px-[15vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* WorkDescription still shows */}
          <WorkDescription />
        </div>

        {/* Error message */}
        <div className="text-center py-12">
          <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSectionEmpty() {
  return (
    <section id="work">
      <div className="mx-auto w-full p-4 md:px-[15vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* WorkDescription still shows */}
          <WorkDescription />
        </div>

        {/* Empty message */}
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No projects available at the moment. Check back soon!
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== Main Content Component =====

function ProjectSectionContent({
  featuredProject,
  regularProjects,
}: {
  featuredProject: ReturnType<typeof useProjectSections>["featuredProject"];
  regularProjects: ReturnType<typeof useProjectSections>["regularProjects"];
}) {
  return (
    <section id="work" className="section-spacing">
      <div className="mx-auto w-full p-4 md:px-[15vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <WorkDescription />
          {/* Featured project only shows if available */}
          {featuredProject && <FeaturedProject project={featuredProject} />}
        </div>

        <ProjectGrid projects={regularProjects} />
      </div>
    </section>
  );
}

// ===== Helper Components =====

function ProjectBoxSkeleton() {
  return (
    <ProjectBox
      size="default"
      topContent={
        <div className="w-full animate-pulse">
          <div className="h-5 bg-gray-500/20 rounded w-4/5" />
        </div>
      }
      bottomContent={
        <div className="w-full animate-pulse">
          <div className="h-5 bg-gray-500/20 rounded w-2/5" />
        </div>
      }
      hoverContent=""
      imageUrl=""
      slug=""
      clickable={false}
    />
  );
}
