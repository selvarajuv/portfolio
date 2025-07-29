// components/sections/project/project-images.tsx

"use client";

// External imports
import Image from "next/image";

// Utils
import { cn } from "@/lib/utils";

type ProjectImagesProps = {
  images: string[];
};

export default function ProjectImages({ images }: ProjectImagesProps) {
  if (!images || images.length === 0) {
    return <ProjectImagesEmpty />;
  }

  return <ProjectImagesContent images={images} />;
}

// ===== State Components =====

function ProjectImagesEmpty() {
  return (
    <div className="w-full mb-32">
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-center">No project images available</p>
      </div>
    </div>
  );
}

// ===== Main Content Component =====

function ProjectImagesContent({ images }: { images: string[] }) {
  return (
    <div className="w-full mb-32">
      <div className="w-full space-y-8">
        {images.map((imageUrl, index) => (
          <ProjectImageItem key={index} imageUrl={imageUrl} index={index} />
        ))}
      </div>
    </div>
  );
}

// ===== Sub Components =====

function ProjectImageItem({
  imageUrl,
  index,
}: {
  imageUrl: string;
  index: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn("relative w-full overflow-hidden rounded-lg bg-gray-800")}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Project image ${index + 1}`}
          width={1200}
          height={800}
          className="w-full h-auto"
          priority={index === 0}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
