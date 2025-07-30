// app/projects/[slug]/page.tsx

"use client";

// External imports
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

// UI components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Layout components
import PageLayout from "@/components/layout/page-layout";

// Project components
import ProjectNavigation from "@/components/sections/project/project-navigation";
import ProjectMetadata from "@/components/sections/project/project-metadata";
import TechnologyList from "@/components/sections/project/technology-list";
import ProjectDetailsList from "@/components/sections/project/project-details-list";
import ProjectImages from "@/components/sections/project/project-images";

// Hooks
import { useProjectDetails } from "@/hooks/project/use-project-details";
import { useProjectScroll } from "@/hooks/project/use-project-scroll";

// Types
import { ProjectItem } from "@/types/project";

// Utils
import { cn } from "@/lib/utils";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { project, loading, error } = useProjectDetails(slug);
  const { handleBackClick } = useProjectScroll(slug);

  // Loading state
  if (loading) {
    return <ProjectPageSkeleton onBackClick={handleBackClick} />;
  }

  // Error state
  if (error) {
    return <ProjectPageError error={error} />;
  }

  // Empty state (no project found)
  if (!project) {
    return <ProjectPageSkeleton onBackClick={handleBackClick} />;
  }

  // Success state
  return (
    <PageLayout activeSection="work">
      <ProjectBackButton onClick={handleBackClick} />
      {/* <ProjectNavigation currentProjectId={slug} /> */}
      <ProjectContent project={project} />
    </PageLayout>
  );
}

// ===== State Components =====

function ProjectPageSkeleton({ onBackClick }: { onBackClick: () => void }) {
  return (
    <PageLayout activeSection="work">
      <ProjectBackButton onClick={onBackClick} />
      <div className="pt-48 mx-auto animate-pulse" style={{ width: "65vw" }}>
        {/* Title Skeleton */}
        <div className="mb-16">
          <div
            className="h-20 bg-gray-500/20 rounded-lg"
            style={{ width: "60%" }}
          />
        </div>

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-4 w-12 bg-gray-500/20 rounded" />
          <span className="text-gray-600">›</span>
          <div className="h-4 w-16 bg-gray-500/20 rounded" />
          <span className="text-gray-600">›</span>
          <div className="h-4 w-32 bg-gray-500/20 rounded" />
        </div>

        {/* Project Details Container */}
        <div className="mb-16" style={{ width: "45vw" }}>
          {/* Metadata Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 w-16 bg-gray-500/20 rounded mb-2" />
                <div className="h-6 w-24 bg-gray-500/10 rounded" />
              </div>
            ))}
          </div>

          {/* Technologies Skeleton */}
          <div className="mb-8">
            <div className="h-6 w-28 bg-gray-500/20 rounded mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-8 bg-gray-500/10 rounded" />
              ))}
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-8">
            <div className="space-y-3 mb-8">
              <div className="h-6 bg-gray-500/20 rounded w-full" />
              <div className="h-6 bg-gray-500/20 rounded w-full" />
              <div className="h-6 bg-gray-500/20 rounded w-[85%]" />
              <div className="h-6 bg-gray-500/20 rounded w-[75%]" />
            </div>

            {/* Open Project Link Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-32 bg-gray-500/30 rounded" />
              <div className="h-6 w-6 bg-gray-500/20 rounded" />
            </div>
          </div>

          <Separator className="my-12 bg-gray-700/30" />

          {/* Challenges and Outcomes Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Challenges */}
            <div>
              <div className="h-7 w-36 bg-gray-500/20 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-2 w-2 bg-gray-500/30 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-500/10 rounded w-full mb-2" />
                      <div className="h-5 bg-gray-500/10 rounded w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div>
              <div className="h-7 w-36 bg-gray-500/20 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-2 w-2 bg-gray-500/30 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-500/10 rounded w-full mb-2" />
                      <div className="h-5 bg-gray-500/10 rounded w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Images Skeleton */}
        <div className="grid grid-cols-1 gap-8 mb-20">
          {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-gray-500/30 rounded-lg" />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

function ProjectPageError({ error }: { error: string }) {
  return (
    <PageLayout activeSection="work">
      <div className="pt-48 mx-auto text-center" style={{ width: "65vw" }}>
        <h1 className="text-4xl font-bold text-red-400 mb-4">Error</h1>
        <p className="text-gray-400 text-lg">{error}</p>
        <Button
          className="mt-8"
          onClick={() => (window.location.href = "/#work")}
        >
          Back to Projects
        </Button>
      </div>
    </PageLayout>
  );
}

// ===== Helper Components =====

function ProjectBackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed left-8 top-24 z-20">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full text-gray-300 transition-all duration-200",
          "hover:text-[var(--accent-primary)] hover:bg-transparent"
        )}
        style={{
          backgroundColor: "var(--overlay-dark)",
          boxShadow: "var(--wood-box-shadow-default)",
        }}
        onClick={onClick}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
    </div>
  );
}

function ProjectContent({ project }: { project: ProjectItem }) {
  return (
    <div className="pt-48 mx-auto" style={{ width: "65vw" }}>
      {/* Project Title */}
      <h1
        className="font-bold mb-16"
        style={{ fontSize: "clamp(5rem, 8vw, 7rem)" }}
      >
        {project.title}
      </h1>

      {/* Breadcrumb */}
      <ProjectBreadcrumb title={project.title} />

      {/* Project Details */}
      <ProjectDetails project={project} />

      {/* Project Images */}
      <ProjectImages images={project.images} />
    </div>
  );
}

function ProjectBreadcrumb({ title }: { title: string }) {
  return (
    <nav
      className="flex items-center text-gray-400 mb-16"
      style={{
        fontSize: "1rem",
      }}
    >
      <Button
        variant="link"
        className={cn(
          "p-0 h-auto text-gray-400",
          "hover:text-[var(--navbar-hover-color)]"
        )}
        style={{ fontSize: "inherit" }}
        asChild
      >
        <Link href="/">Home</Link>
      </Button>
      <span className="mx-3">›</span>
      <Button
        variant="link"
        className={cn(
          "p-0 h-auto text-gray-400",
          "hover:text-[var(--navbar-hover-color)]"
        )}
        style={{ fontSize: "inherit" }}
        asChild
      >
        <Link href="/#work">Projects</Link>
      </Button>
      <span className="mx-3">›</span>
      <span className="text-white">{title}</span>
    </nav>
  );
}

function ProjectDetails({ project }: { project: ProjectItem }) {
  return (
    <div className="mb-16" style={{ width: "45vw" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <ProjectMetadata title="Client" content={project.client} />
        <ProjectMetadata title="Duration" content={project.duration} />
        <ProjectMetadata title="Year" content={project.year} />
        <ProjectMetadata title="Category" content={project.category} />
      </div>

      {/* Technologies */}
      {project.technologies && project.technologyNames && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Technologies
          </h3>
          <TechnologyList
            technologies={project.technologies}
            techNames={project.technologyNames}
          />
        </div>
      )}

      {/* Main Description */}
      <div className="mb-8">
        <p
          className="text-xl text-gray-300 leading-relaxed mb-8"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}
        >
          {project.description}
        </p>

        {/* Open Project Link */}
        <a
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-3 text-xl text-white",
            "hover:text-gray-300 transition-colors duration-200"
          )}
        >
          <span>Open Project</span>
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>

      <Separator className="my-12 bg-gray-700" />

      {/* Challenges and Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <ProjectDetailsList
          title="Key Challenges"
          items={project.challenges}
          type="challenge"
        />
        <ProjectDetailsList
          title="Key Outcomes"
          items={project.outcomes}
          type="outcome"
        />
      </div>
    </div>
  );
}
