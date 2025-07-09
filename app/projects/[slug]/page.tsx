// app/projects/[slug]/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/layout/page-layout";
import ProjectNavigation from "@/components/sections/project/project-navigation";
import projects from "@/data/projects";
import skills from "@/data/skills";
import SvgIcon from "@/components/sections/skill/svg-icon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects[slug];
  const router = useRouter();

  // Remove the existing two separate useEffect hooks and replace with this single one
  useEffect(() => {
    // Prevent scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Immediate scroll to top - no animation (handles both initial load and slug changes)
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Execute immediately
    scrollToTop();

    // Also execute on any potential async updates
    const timeoutId = setTimeout(scrollToTop, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [slug]); // Only depend on slug changes

  const handleBackClick = () => {
    // Store a flag to indicate we want to go directly to work section
    sessionStorage.setItem("scrollToWork", "true");
    router.push("/");
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  // Helper function to get skill icon path by name
  const getSkillIcon = (techName: string) => {
    const skill = skills.find(
      (s) => s.name.toLowerCase() === techName.toLowerCase()
    );
    return skill ? skill.iconPath : null;
  };

  return (
    <PageLayout activeSection="work">
      {/* Back button positioned on the left */}
      <div className="fixed left-8 top-24 z-20">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full text-gray-300 hover:text-[#016428] hover:bg-transparent transition-all duration-200"
          style={{
            backgroundColor: "#3d1f0f",
            boxShadow: `
              inset 0 0 30px rgba(0, 0, 0, 0.8),
              inset 0 0 60px rgba(0, 0, 0, 0.6),
              inset 0 0 100px rgba(0, 0, 0, 0.3)
            `,
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
        {/* Project title - bigger size */}
        <h1 className="text-6xl md:text-7xl font-bold mb-16 tracking-tight leading-none max-w-4xl">
          {project.title}
        </h1>

        {/* Breadcrumb - moved down with more spacing */}
        <nav className="flex items-center text-sm text-gray-400 mb-16">
          <Button
            variant="link"
            className="p-0 h-auto text-gray-400 hover:text-[#016428]"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <span className="mx-3">›</span>
          <Button
            variant="link"
            className="p-0 h-auto text-gray-400 hover:text-[#016428]"
            asChild
          >
            <Link href="/#work">Projects</Link>
          </Button>
          <span className="mx-3">›</span>
          <span className="text-white">{project.title}</span>
        </nav>

        {/* Project details section */}
        <div className="max-w-4xl mb-16">
          {/* Project metadata grid - now with plain text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Client</h3>
              <p className="text-gray-300">{project.client}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((tech, index) => {
                    const iconPath = getSkillIcon(tech);
                    return iconPath ? (
                      <div
                        key={index}
                        className="flex items-center"
                        title={tech}
                      >
                        <SvgIcon
                          src={iconPath}
                          alt={`${tech} icon`}
                          size={24}
                          className="flex-shrink-0"
                        />
                      </div>
                    ) : null;
                  })
                ) : (
                  <p className="text-gray-300">Coming Soon</p>
                )}
              </div>
            </div>
          </div>

          {/* Main description - moved below metadata */}
          <div className="mb-8">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Open Project Link */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xl text-white hover:text-gray-300 transition-colors duration-200"
            >
              <span>Open Project</span>
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>

          <Separator className="my-12 bg-gray-700" />

          {/* Challenges and Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Challenges */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <Badge
                      variant="destructive"
                      className="mt-1 w-2 h-2 p-0 rounded-full bg-[#016428]"
                    >
                      <span className="sr-only">Challenge</span>
                    </Badge>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Key Outcomes
              </h3>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <Badge
                      variant="default"
                      className="mt-1 w-2 h-2 p-0 rounded-full bg-[#016428]"
                    >
                      <span className="sr-only">Success</span>
                    </Badge>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Images - Vertical stacked layout */}
        <div className="w-full mb-32">
          {/* Images now span the full container width */}
          <div className="w-full space-y-8">
            {/* Stack all images vertically */}
            {project.images.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video w-full">
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
      </div>
    </PageLayout>
  );
}
