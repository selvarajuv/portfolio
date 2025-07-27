// app/projects/[slug]/page.tsx

"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/page-layout";
import ProjectNavigation from "@/components/sections/project/project-navigation";
import ProjectMetadata from "@/components/sections/project/project-metadata";
import TechnologyList from "@/components/sections/project/technology-list";
import ProjectDetailsList from "@/components/sections/project/project-details-list";
import ProjectImages from "@/components/sections/project/project-images";
import AsyncStateWrapper from "@/components/ui/async-state-wrapper";
import { cn } from "@/lib/utils";
import { useProjectDetails } from "@/hooks/project/use-project-details";
import { useProjectScroll } from "@/hooks/project/use-project-scroll";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { project, loading, error, notFound } = useProjectDetails(slug);
  const { handleBackClick } = useProjectScroll(slug);

  return (
    <AsyncStateWrapper
      loading={loading}
      error={error}
      notFound={notFound}
      loadingMessage="Loading project..."
      notFoundTitle="Project not found"
      notFoundMessage="The requested project could not be found."
      activeSection="work"
    >
      <PageLayout activeSection="work">
        {/* Back Button */}
        <ProjectBackButton onClick={handleBackClick} />

        {/* Project Navigation */}
        {/* <ProjectNavigation currentProjectId={slug} /> */}

        {/* Main Content */}
        <ProjectContent project={project!} />
      </PageLayout>
    </AsyncStateWrapper>
  );
}

function ProjectBackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed left-8 top-24 z-20">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full text-gray-300 transition-all duration-200",
          "hover:text-[var(--navbar-hover-color)] hover:bg-transparent"
        )}
        style={{
          backgroundColor: "var(--forest-dark)",
          boxShadow: "var(--wood-box-shadow-default)",
        }}
        onClick={onClick}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
    </div>
  );
}

function ProjectContent({
  project,
}: {
  project: NonNullable<ReturnType<typeof useProjectDetails>["project"]>;
}) {
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

function ProjectDetails({
  project,
}: {
  project: NonNullable<ReturnType<typeof useProjectDetails>["project"]>;
}) {
  return (
    <div className="max-w-4xl mb-16">
      {/* Project Metadata Grid - Updated with 3 responsive states */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <ProjectMetadata title="Client" content={project.client} />
        <ProjectMetadata title="Duration" content={project.duration} />
        <ProjectMetadata title="Year" content={project.year} />
        <ProjectMetadata title="Category" content={project.category} />
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Technologies
          </h3>
          <TechnologyList technologies={project.technologies} />
        </div>
      )}

      {/* Main Description */}
      <div className="mb-8">
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Open Project Link */}
        <a
          href="#"
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
