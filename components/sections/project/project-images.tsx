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
                "relative w-full overflow-hidden rounded-lg bg-gray-800"
              )}
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
        ))}
      </div>
    </div>
  );
}
