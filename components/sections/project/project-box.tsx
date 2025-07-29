// components/sections/project/project-box.tsx

"use client";

// External imports
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import WoodenBox from "@/components/forest-theme/wood-box";

// Types
import { ProjectBoxSize, ProjectBoxDimensions } from "@/types/project";

// Constants
export const sizeVariants: Record<ProjectBoxSize, ProjectBoxDimensions> = {
  default: {
    container: {
      width: "min(360px, 80vw)",
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

// Types
type ProjectBoxProps = {
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  hoverContent?: string;
  slug?: string;
  size?: ProjectBoxSize;
  clickable?: boolean;
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

  // Note: This is a presentation component that receives all data as props
  // No loading/error states needed - parent handles data fetching

  const content = (
    <ProjectBoxContent
      className={className}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      topContent={topContent}
      bottomContent={bottomContent}
      hoverContent={hoverContent}
      size={size}
      dimensions={dimensions}
      isHovered={isHovered}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    />
  );

  // Wrap with Link if clickable and slug is provided
  if (clickable && slug) {
    return <Link href={`/projects/${slug}`}>{content}</Link>;
  }

  return content;
}

// ===== Main Components =====

function ProjectBoxContent({
  className,
  imageUrl,
  imageAlt,
  topContent,
  bottomContent,
  hoverContent,
  size,
  dimensions,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  className: string;
  imageUrl?: string;
  imageAlt: string;
  topContent: ReactNode;
  bottomContent: ReactNode;
  hoverContent: string;
  size: ProjectBoxSize;
  dimensions: ProjectBoxDimensions;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
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
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
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
          <ProjectBoxImage
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            aspectRatio={dimensions.image.aspectRatio}
            isHovered={isHovered}
          />

          <ProjectBoxBottom
            topContent={topContent}
            bottomContent={bottomContent}
            hoverContent={hoverContent}
            size={size}
            dimensions={dimensions}
            isHovered={isHovered}
          />
        </div>
      </WoodenBox>
    </div>
  );
}

// ===== Sub Components =====

function ProjectBoxImage({
  imageUrl,
  imageAlt,
  aspectRatio,
  isHovered,
}: {
  imageUrl?: string;
  imageAlt: string;
  aspectRatio: string;
  isHovered: boolean;
}) {
  return (
    <div
      className="relative w-full overflow-hidden shrink-0"
      style={{ aspectRatio }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={`object-cover transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
      ) : (
        <ProjectBoxImagePlaceholder isHovered={isHovered} />
      )}
    </div>
  );
}

function ProjectBoxImagePlaceholder({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 animate-pulse">
      <span
        className={`transition-transform duration-700 ease-in-out ${
          isHovered ? "scale-110" : "scale-100"
        }`}
      >
        {/* Empty span for scaling effect */}
      </span>
    </div>
  );
}

function ProjectBoxBottom({
  topContent,
  bottomContent,
  hoverContent,
  size,
  dimensions,
  isHovered,
}: {
  topContent: ReactNode;
  bottomContent: ReactNode;
  hoverContent: string;
  size: ProjectBoxSize;
  dimensions: ProjectBoxDimensions;
  isHovered: boolean;
}) {
  return (
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
        <ProjectBoxDefaultLayout
          topContent={topContent}
          bottomContent={bottomContent}
          hoverContent={hoverContent}
          dimensions={dimensions}
          isHovered={isHovered}
        />
      ) : (
        <ProjectBoxLargeLayout
          topContent={topContent}
          bottomContent={bottomContent}
          hoverContent={hoverContent}
          dimensions={dimensions}
          isHovered={isHovered}
        />
      )}
    </div>
  );
}

function ProjectBoxDefaultLayout({
  topContent,
  bottomContent,
  hoverContent,
  dimensions,
  isHovered,
}: {
  topContent: ReactNode;
  bottomContent: ReactNode;
  hoverContent: string;
  dimensions: ProjectBoxDimensions;
  isHovered: boolean;
}) {
  return (
    <div className="w-[85%] h-[70%] flex flex-col">
      {/* Title */}
      <div className="flex-1 flex items-center">
        {typeof topContent === "string" || typeof topContent === "number" ? (
          <p
            className="text-white font-medium truncate w-full"
            style={{ fontSize: dimensions.text.title }}
          >
            {topContent || "Project Title"}
          </p>
        ) : (
          topContent
        )}
      </div>

      {/* Description with hover effect */}
      <ProjectBoxHoverContent
        content={bottomContent}
        hoverContent={hoverContent}
        fontSize={dimensions.text.description}
        isHovered={isHovered}
      />
    </div>
  );
}

function ProjectBoxLargeLayout({
  topContent,
  bottomContent,
  hoverContent,
  dimensions,
  isHovered,
}: {
  topContent: ReactNode;
  bottomContent: ReactNode;
  hoverContent: string;
  dimensions: ProjectBoxDimensions;
  isHovered: boolean;
}) {
  return (
    <div className="w-full px-8">
      <h3
        className="text-white font-medium truncate mb-2"
        style={{ fontSize: dimensions.text.title }}
      >
        {topContent || "Project Title"}
      </h3>

      <div className="relative h-[30px] overflow-hidden">
        <ProjectBoxHoverTransition
          content={bottomContent || "View Project"}
          hoverContent={hoverContent}
          fontSize={dimensions.text.description}
          isHovered={isHovered}
        />
      </div>
    </div>
  );
}

function ProjectBoxHoverContent({
  content,
  hoverContent,
  fontSize,
  isHovered,
}: {
  content: ReactNode;
  hoverContent: string;
  fontSize: string;
  isHovered: boolean;
}) {
  return (
    <div className="flex-1 relative overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center transition-transform duration-300 ${
          isHovered ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {typeof content === "string" || typeof content === "number" ? (
          <p
            className="text-white font-medium truncate w-full"
            style={{ fontSize }}
          >
            {content || "Project Title"}
          </p>
        ) : (
          content || (
            <p
              className="text-white font-medium truncate w-full"
              style={{ fontSize }}
            >
              Project Title
            </p>
          )
        )}
      </div>

      <div
        className={`absolute inset-0 flex items-center transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <p className="text-white truncate w-full" style={{ fontSize }}>
          {hoverContent}
        </p>
      </div>
    </div>
  );
}

function ProjectBoxHoverTransition({
  content,
  hoverContent,
  fontSize,
  isHovered,
}: {
  content: ReactNode;
  hoverContent: string;
  fontSize: string;
  isHovered: boolean;
}) {
  return (
    <>
      <div
        className={`absolute inset-0 flex items-center transition-transform duration-300 ${
          isHovered ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <p className="text-white truncate" style={{ fontSize }}>
          {content}
        </p>
      </div>

      <div
        className={`absolute inset-0 flex items-center transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <p className="text-white truncate" style={{ fontSize }}>
          {hoverContent}
        </p>
      </div>
    </>
  );
}
