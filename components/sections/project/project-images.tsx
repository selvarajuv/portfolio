// components/sections/project/project-images.tsx

import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectImagesProps = {
  images: string[];
};

export default function ProjectImages({ images }: ProjectImagesProps) {
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
