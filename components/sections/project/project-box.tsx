// components/sections/project/project-box.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import WoodenBox from "../../forest-theme/wood-box";
import { ProjectBoxSize, ProjectBoxDimensions } from "@/types/project";

type ProjectBoxProps = {
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  topContent?: string;
  bottomContent?: string;
  hoverContent?: string;
  slug?: string;
  size?: ProjectBoxSize;
  clickable?: boolean;
};

const sizeVariants: Record<ProjectBoxSize, ProjectBoxDimensions> = {
  default: {
    container: {
      width: "min(380px, 65vw)",
      height: "auto",
      aspectRatio: ".9",
    },
    inner: {
      padding: "0px",
    },
    image: {
      aspectRatio: "1.25",
    },
    bottom: {
      flex: "1",
    },
    text: {
      title: "clamp(1.25rem, 3vw, 1.5rem)",
      description: "clamp(0.875rem, 2vw, 0.875rem)",
    },
  },
  large: {
    container: {
      width: "min(800px, 65vw)",
      height: "auto",
      aspectRatio: "1.33",
    },
    inner: {
      padding: "0px",
    },
    image: {
      aspectRatio: "1.45",
    },
    bottom: {
      flex: "1",
    },
    text: {
      title: "clamp(1.5rem, 4vw, 1.875rem)",
      description: "clamp(1rem, 2.5vw, 1rem)",
    },
  },
};

export default function ProjectBox({
  className = "",
  imageUrl,
  imageAlt = "Project image",
  topContent = "",
  bottomContent = "",
  hoverContent = "Click to explore",
  slug = "",
  size = "default",
  clickable = true,
}: ProjectBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = sizeVariants[size];

  const content = (
    <div
      className="project-box-wrapper"
      style={{
        width: dimensions.container.width,
        aspectRatio: dimensions.container.aspectRatio,
      }}
    >
      <WoodenBox
        className={className}
        width="100%"
        height="100%"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner container */}
        <div
          className="bg-gray-900 overflow-hidden rounded-md flex flex-col"
          style={{
            margin: dimensions.inner.padding,
            width: `calc(100% - calc(${dimensions.inner.padding} * 2))`,
            height: `calc(100% - calc(${dimensions.inner.padding} * 2))`,
            boxShadow:
              size === "large"
                ? "0 6px 12px rgba(0, 0, 0, 0.3)"
                : "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Image container */}
          <div
            className="relative w-full overflow-hidden shrink-0"
            style={{ aspectRatio: dimensions.image.aspectRatio }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className={`object-cover transition-transform duration-700 ease-in-out ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                <span
                  className={`transition-transform duration-700 ease-in-out ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                >
                  Image Area
                </span>
              </div>
            )}
          </div>

          {/* Bottom section - takes remaining space */}
          <div
            className={`w-full flex ${
              size === "default"
                ? "justify-center items-center bg-[#014421]"
                : "items-center bg-transparent"
            }`}
            style={{
              flex: dimensions.bottom.flex,
              backdropFilter: size === "default" ? "blur(4px)" : "none",
            }}
          >
            {size === "default" ? (
              // Default size layout
              <div className="w-[85%] h-[70%] flex flex-col">
                {/* Title */}
                <div className="flex-1 flex items-center">
                  <p
                    className="text-white font-medium truncate w-full"
                    style={{ fontSize: dimensions.text.title }}
                  >
                    {topContent || "Project Title"}
                  </p>
                </div>

                {/* Description with hover effect */}
                <div className="flex-1 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                      isHovered ? "-translate-y-full" : "translate-y-0"
                    }`}
                  >
                    <p
                      className="text-white truncate w-full"
                      style={{ fontSize: dimensions.text.description }}
                    >
                      {bottomContent || "View Project"}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                      isHovered ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    <p
                      className="text-white truncate w-full"
                      style={{ fontSize: dimensions.text.description }}
                    >
                      {hoverContent}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Large size layout
              <div className="w-full px-8">
                <h3
                  className="text-white font-medium truncate mb-2"
                  style={{ fontSize: dimensions.text.title }}
                >
                  {topContent || "Project Title"}
                </h3>

                <div className="relative h-[30px] overflow-hidden">
                  <div
                    className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                      isHovered ? "-translate-y-full" : "translate-y-0"
                    }`}
                  >
                    <p
                      className="text-white truncate"
                      style={{ fontSize: dimensions.text.description }}
                    >
                      {bottomContent || "View Project"}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                      isHovered ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    <p
                      className="text-white truncate"
                      style={{ fontSize: dimensions.text.description }}
                    >
                      {hoverContent}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </WoodenBox>
    </div>
  );

  // Wrap with Link if clickable and slug is provided
  if (clickable && slug) {
    return <Link href={`/projects/${slug}`}>{content}</Link>;
  }

  return content;
}
