// components/sections/project/project-box.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import WoodenBox from "../../decorative/wood-box";
import type {
  WorkBoxSize,
  WorkBoxDimensions,
  WorkBoxProps,
} from "@/types/project";

const sizeVariants: Record<WorkBoxSize, WorkBoxDimensions> = {
  default: {
    container: { width: "380px", height: "420px" },
    inner: { width: "330px", height: "370px" },
    image: { height: "235px" },
    bottom: { height: 135 },
    text: {
      title: "text-2xl",
      description: "text-sm",
    },
  },
  large: {
    container: { width: "800px", height: "600px" },
    inner: { width: "750px", height: "550px" },
    image: { height: "415px" },
    bottom: { height: 135 },
    text: {
      title: "text-3xl",
      description: "text-base",
    },
  },
};

export default function WorkBox({
  className = "",
  imageUrl,
  imageAlt = "Project image",
  topContent = "",
  bottomContent = "",
  hoverContent = "Click to explore",
  slug = "",
  size = "default",
  clickable = true,
}: WorkBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = sizeVariants[size];

  const content = (
    <WoodenBox
      className={className}
      width={dimensions.container.width}
      height={dimensions.container.height}
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner container with reduced dimensions to account for padding */}
      <div
        className="bg-gray-900 overflow-hidden rounded-md"
        style={{
          width: dimensions.inner.width,
          height: dimensions.inner.height,
          boxShadow:
            size === "large"
              ? "0 6px 12px rgba(0, 0, 0, 0.3)"
              : "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: dimensions.image.height }}
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
                Image Area ({dimensions.inner.width}×{dimensions.image.height})
              </span>
            </div>
          )}
        </div>

        {/* Bottom section with content */}
        {size === "default" ? (
          // Default size layout with secondary color background
          <div
            className="w-full flex justify-center items-center bg-[#014421]"
            style={{
              height: `${dimensions.bottom.height}px`,
              backdropFilter: "blur(4px)",
            }}
          >
            <div
              className="bg-transparent rounded flex flex-col"
              style={{ width: "275px", height: "70px" }}
            >
              {/* Top box with larger white text */}
              <div className="flex-1 flex items-center justify-start">
                {topContent ? (
                  <p
                    className={`text-white px-4 text-left font-medium ${dimensions.text.title} truncate`}
                  >
                    {topContent}
                  </p>
                ) : (
                  <p
                    className={`text-white px-4 text-left font-medium ${dimensions.text.title} truncate`}
                  >
                    Project Title
                  </p>
                )}
              </div>

              {/* Bottom box with text that changes on hover */}
              <div className="flex-1 relative overflow-hidden">
                {/* Default text */}
                <div
                  className={`absolute inset-0 flex items-center px-4 transition-transform duration-300 ${
                    isHovered ? "-translate-y-full" : "translate-y-0"
                  }`}
                >
                  <p
                    className={`text-white text-left ${dimensions.text.description} truncate`}
                  >
                    {bottomContent || "View Project"}
                  </p>
                </div>

                {/* Hover text that rolls in from bottom */}
                <div
                  className={`absolute inset-0 flex items-center px-4 transition-transform duration-300 ${
                    isHovered ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <p
                    className={`text-white text-left ${dimensions.text.description} truncate`}
                  >
                    {hoverContent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Large size layout with transparent background
          <div
            className="w-full bg-transparent"
            style={{ height: `${dimensions.bottom.height}px` }}
          >
            <div className="h-full flex flex-col justify-center px-8">
              {/* Title */}
              <div className="mb-3">
                <h3
                  className={`text-white ${dimensions.text.title} font-medium truncate`}
                >
                  {topContent || "Project Title"}
                </h3>
              </div>

              {/* Description with hover effect */}
              <div
                className="relative overflow-hidden"
                style={{ height: "30px" }}
              >
                {/* Default text */}
                <div
                  className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                    isHovered ? "-translate-y-full" : "translate-y-0"
                  }`}
                >
                  <p
                    className={`text-white ${dimensions.text.description} truncate`}
                  >
                    {bottomContent || "View Project"}
                  </p>
                </div>

                {/* Hover text that rolls in from bottom */}
                <div
                  className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                    isHovered ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <p
                    className={`text-white ${dimensions.text.description} truncate`}
                  >
                    {hoverContent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WoodenBox>
  );

  // Wrap with Link if clickable and slug is provided
  if (clickable && slug) {
    return <Link href={`/projects/${slug}`}>{content}</Link>;
  }

  return content;
}
