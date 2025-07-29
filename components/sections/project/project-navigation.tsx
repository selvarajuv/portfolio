// components/sections/project/project-navigation.tsx

"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WoodenBox from "@/components/forest-theme/wood-box";
import { vineFrame } from "@/data/vine-configs";
import { cn } from "@/lib/utils";
import projects from "@/data/projects";

// Types
type ProjectNavigationProps = {
  currentProjectId: string;
};

type NavigationData = {
  prevProjectId: string;
  nextProjectId: string;
  nextProject: (typeof projects)[keyof typeof projects];
};

// Custom hook for project navigation logic
function useProjectNavigation(currentProjectId: string): NavigationData | null {
  const projectIds = Object.keys(projects);
  const currentIndex = projectIds.indexOf(currentProjectId);

  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % projectIds.length;
  const prevIndex =
    currentIndex === 0 ? projectIds.length - 1 : currentIndex - 1;

  return {
    nextProjectId: projectIds[nextIndex],
    prevProjectId: projectIds[prevIndex],
    nextProject: projects[projectIds[nextIndex]],
  };
}

// Main Component
export default function ProjectNavigation({
  currentProjectId,
}: ProjectNavigationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigationData = useProjectNavigation(currentProjectId);

  if (!navigationData) return null;

  const { nextProject, nextProjectId, prevProjectId } = navigationData;

  return (
    <div className="fixed bottom-8 right-8 z-20">
      {/* Hover image preview */}
      {isHovered && nextProject.imageUrl && (
        <ProjectPreview
          imageUrl={nextProject.imageUrl}
          title={nextProject.title}
          isHovered={isHovered}
        />
      )}

      {/* Navigation box */}
      <WoodenBox
        className="min-w-[280px] cursor-pointer"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        vineConfig={vineFrame}
        showVines={true}
      >
        <div className="p-6">
          <NavigationHeader
            prevProjectId={prevProjectId}
            nextProjectId={nextProjectId}
          />
          <NavigationTitle
            nextProjectId={nextProjectId}
            title={nextProject.title}
          />
        </div>
      </WoodenBox>
    </div>
  );
}

// Sub Components
function ProjectPreview({
  imageUrl,
  title,
  isHovered,
}: {
  imageUrl: string;
  title: string;
  isHovered: boolean;
}) {
  const previewStyles = {
    transform: isHovered
      ? "translateY(0) scale(1)"
      : "translateY(10px) scale(0.95)",
    opacity: isHovered ? 1 : 0,
    width: "clamp(240px, 20vw, 320px)",
  };

  return (
    <div
      className="absolute bottom-full right-0 mb-4 transition-all duration-300 ease-out"
      style={previewStyles}
    >
      <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={imageUrl}
          alt={`${title} preview`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 240px, 320px"
          priority={false}
        />
      </div>
    </div>
  );
}

function NavigationHeader({
  prevProjectId,
  nextProjectId,
}: {
  prevProjectId: string;
  nextProjectId: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-white font-medium">Next Project</span>
      <div className="flex items-center gap-2">
        <Link
          href={`/projects/${prevProjectId}`}
          aria-label="Previous project"
          className="group"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 text-gray-400",
              "hover:text-[var(--accent-primary)] transition-colors"
            )}
          />
        </Link>
        <Link
          href={`/projects/${nextProjectId}`}
          aria-label="Next project"
          className="group"
        >
          <ChevronRight
            className={cn(
              "w-5 h-5 text-gray-400",
              "hover:text-[var(--accent-primary)] transition-colors"
            )}
          />
        </Link>
      </div>
    </div>
  );
}

function NavigationTitle({
  nextProjectId,
  title,
}: {
  nextProjectId: string;
  title: string;
}) {
  return (
    <Link
      href={`/projects/${nextProjectId}`}
      className={cn(
        "block text-white text-lg font-semibold leading-tight",
        "hover:text-[var(--accent-primary)] transition-colors"
      )}
    >
      {title}
    </Link>
  );
}
