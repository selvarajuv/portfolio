// app/projects/[slug]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/page-layout";
import ProjectNavigation from "@/components/sections/project/project-navigation";
import { cn } from "@/lib/utils";
import { scrollToTop } from "@/lib/scroll";
import { useProject } from "@/hooks/use-project";
import { ProjectItem } from "@/types/project";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { projects, loading, error } = useProject();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const router = useRouter();

  // Find the project by slug
  useEffect(() => {
    if (projects.length > 0) {
      const foundProject = projects.find((p) => p.id === slug);
      setProject(foundProject || null);
    }
  }, [projects, slug]);

  // Handle scroll restoration and reset
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTop();
    const timeoutId = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timeoutId);
  }, [slug]);

  const handleBackClick = () => {
    sessionStorage.setItem("scrollToWork", "true");
    router.push("/");
  };

  // Loading state
  if (loading) {
    return (
      <PageLayout activeSection="work">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-lg">Loading project...</div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout activeSection="work">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg mb-4">
              {error}
            </div>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Project not found
  if (!project) {
    return (
      <PageLayout activeSection="work">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Project not found
            </h1>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout activeSection="work">
      {/* Back button positioned on the left */}
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
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Project Navigation */}
      <ProjectNavigation currentProjectId={slug} />

      {/* Content container - centered with equal spacing */}
      <div className="relative z-10 px-8 pt-48 max-w-7xl mx-auto">
        {/* Project title */}
        <h1
          className={cn(
            "text-6xl md:text-7xl font-bold mb-16 tracking-tight leading-none",
            "max-w-4xl"
          )}
        >
          {project.title}
        </h1>

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400 mb-16">
          <Button
            variant="link"
            className={cn(
              "p-0 h-auto text-gray-400",
              "hover:text-[var(--navbar-hover-color)]"
            )}
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
            asChild
          >
            <Link href="/#work">Projects</Link>
          </Button>
          <span className="mx-3">›</span>
          <span className="text-white">{project.title}</span>
        </nav>

        {/* Project details section */}
        <div className="max-w-4xl mb-16">
          {/* Project metadata grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
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

          {/* Main description */}
          <div className="mb-8">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Open Project Link - you can add a website URL field to your Notion database */}
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
            <ProjectSection
              title="Key Challenges"
              items={project.challenges}
              type="challenge"
            />
            <ProjectSection
              title="Key Outcomes"
              items={project.outcomes}
              type="outcome"
            />
          </div>
        </div>

        {/* Project Images */}
        <ProjectImages images={project.images} />
      </div>
    </PageLayout>
  );
}

// Updated Components

interface ProjectMetadataProps {
  title: string;
  content: React.ReactNode;
}

function ProjectMetadata({ title, content }: ProjectMetadataProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {typeof content === "string" ? (
        <p className="text-gray-300">{content}</p>
      ) : (
        content
      )}
    </div>
  );
}

interface TechnologyListProps {
  technologies: string[];
}

function TechnologyList({ technologies }: TechnologyListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((techUrl, index) => (
        <div
          key={index}
          className="flex items-center"
          title={`Technology ${index + 1}`}
        >
          <img
            src={techUrl}
            alt={`Technology ${index + 1}`}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ))}
    </div>
  );
}

interface ProjectSectionProps {
  title: string;
  items: string[];
  type: "challenge" | "outcome";
}

function ProjectSection({ title, items, type }: ProjectSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <Badge
              variant={type === "challenge" ? "destructive" : "default"}
              className={cn(
                "mt-1 w-2 h-2 p-0 rounded-full",
                "bg-[var(--navbar-hover-color)]"
              )}
            >
              <span className="sr-only">
                {type === "challenge" ? "Challenge" : "Success"}
              </span>
            </Badge>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProjectImagesProps {
  images: string[];
}

function ProjectImages({ images }: ProjectImagesProps) {
  return (
    <div className="w-full mb-32">
      <div className="w-full space-y-8">
        {images.map((imageUrl, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "relative overflow-hidden rounded-lg bg-gray-800",
                "aspect-video w-full"
              )}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
