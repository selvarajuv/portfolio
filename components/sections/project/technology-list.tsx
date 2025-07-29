// components/sections/project/technology-list.tsx

"use client";

// External imports
import React from "react";

type TechnologyListProps = {
  technologies: string[];
};

export default function TechnologyList({ technologies }: TechnologyListProps) {
  if (!technologies || technologies.length === 0) {
    return <TechnologyListEmpty />;
  }

  return <TechnologyListContent technologies={technologies} />;
}

// ===== State Components =====

function TechnologyListEmpty() {
  return (
    <div className="text-gray-400 text-sm italic">
      No technologies specified
    </div>
  );
}

// ===== Main Content Component =====

function TechnologyListContent({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((techUrl, index) => (
        <TechnologyListItem key={index} techUrl={techUrl} index={index} />
      ))}
    </div>
  );
}

// ===== Sub Components =====

function TechnologyListItem({
  techUrl,
  index,
}: {
  techUrl: string;
  index: number;
}) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback if image fails to load
    e.currentTarget.style.display = "none";
  };

  return (
    <div className="flex items-center" title={`Technology ${index + 1}`}>
      <img
        src={techUrl}
        alt={`Technology ${index + 1}`}
        className="w-8 h-8 object-contain rounded-sm"
        onError={handleImageError}
      />
    </div>
  );
}
