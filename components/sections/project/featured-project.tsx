// components/sections/project/featured-project.tsx

"use client";

// External imports
import Image from "next/image";
import Link from "next/link";

// UI components
import { Button } from "@/components/ui/button";

// Types
import { ProjectItem } from "@/types/project";

// Utils
import { cn } from "@/lib/utils";

type FeaturedProjectProps = {
  project: ProjectItem;
};

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  if (!project) {
    return null;
  }

  return <FeaturedProjectContent project={project} />;
}

// ===== Main Content Component =====

function FeaturedProjectContent({ project }: { project: ProjectItem }) {
  return (
    <div className="flex flex-col">
      <p className="text-gray-400 mb-4">Featured Project</p>

      <FeaturedProjectImage
        imageUrl={project.cardImage}
        title={project.title}
      />

      <FeaturedProjectDetails title={project.title} projectId={project.id} />
    </div>
  );
}

// ===== Sub Components =====

function FeaturedProjectImage({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-lg">
      <Image
        src={imageUrl || "/placeholder-project.png"}
        alt={title}
        width={500}
        height={300}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}

function FeaturedProjectDetails({
  title,
  projectId,
}: {
  title: string;
  projectId: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <Button
        className={cn(
          "w-fit text-white",
          "bg-[var(--forest-dark)] hover:bg-[var(--navbar-hover-color)]"
        )}
        asChild
      >
        <Link href={`/projects/${projectId}`}>View Project</Link>
      </Button>
    </div>
  );
}
