// components/sections/project/featured-project.tsx

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/types/project";

type FeaturedProjectProps = {
  project: ProjectItem;
};

export default function FeaturedProject({ project }: FeaturedProjectProps) {
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
          asChild
        >
          <Link href={`/projects/${project.id}`}>View Project</Link>
        </Button>
      </div>
    </div>
  );
}
