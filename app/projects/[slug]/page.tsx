// app/projects/[slug]/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/page-layout";
import ProjectNavigation from "@/components/sections/project/project-navigation";
import SvgIcon from "@/components/sections/skill/svg-icon";
import { cn } from "@/lib/utils";
import { scrollToTop } from "@/lib/scroll";
import projects from "@/data/projects";
import skills from "@/data/skills";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects[slug];
  const router = useRouter();

  // Handle scroll restoration and reset
  useEffect(() => {
    // Prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Use utility function for scroll reset
    scrollToTop();

    // Also execute on any potential async updates
    const timeoutId = setTimeout(scrollToTop, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [slug]);

  const handleBackClick = () => {
    // Store a flag to indicate we want to go directly to work section
    sessionStorage.setItem("scrollToWork", "true");
    router.push("/");
  };

  // Helper function to get skill icon path by name
  const getSkillIcon = (techName: string) => {
    const skill = skills.find(
      (s) => s.name.toLowerCase() === techName.toLowerCase()
    );
    return skill ? skill.iconPath : null;
  };

  if (!project) {
    return (
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
            <ProjectMetadata
              title="Technologies"
              content={
                <TechnologyList
                  technologies={project.technologies}
                  getSkillIcon={getSkillIcon}
                />
              }
            />
          </div>

          {/* Main description */}
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

// Extracted Components for better organization

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
  technologies?: string[];
  getSkillIcon: (techName: string) => string | null;
}

function TechnologyList({ technologies, getSkillIcon }: TechnologyListProps) {
  if (!technologies || technologies.length === 0) {
    return <p className="text-gray-300">Coming Soon</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => {
        const iconPath = getSkillIcon(tech);
        return iconPath ? (
          <div key={index} className="flex items-center" title={tech}>
            <SvgIcon
              src={iconPath}
              alt={`${tech} icon`}
              size={24}
              className="flex-shrink-0"
            />
          </div>
        ) : null;
      })}
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
  images: Array<{ src: string; alt: string }>;
}

function ProjectImages({ images }: ProjectImagesProps) {
  return (
    <div className="w-full mb-32">
      <div className="w-full space-y-8">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "relative overflow-hidden rounded-lg bg-gray-800",
                "aspect-video w-full"
              )}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
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
