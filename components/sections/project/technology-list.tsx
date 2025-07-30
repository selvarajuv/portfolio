// components/sections/project/technology-list.tsx

"use client";

// External imports
import React, { useState } from "react";

export default function TechnologyList({
  technologies,
  techNames,
}: {
  technologies: string[];
  techNames: string[];
}) {
  if (!technologies || technologies.length === 0) {
    return <TechnologyListEmpty />;
  }

  return (
    <TechnologyListContent technologies={technologies} techNames={techNames} />
  );
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

function TechnologyListContent({
  technologies,
  techNames,
}: {
  technologies: string[];
  techNames: string[];
}) {
  console.log(technologies);
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((technology, idx) => (
        <TechnologyListItem technology={technology} techName={techNames[idx]} />
      ))}
    </div>
  );
}

// ===== Sub Components =====

let activeTooltipSetter: ((show: boolean) => void) | null = null;

function TechnologyListItem({
  technology,
  techName,
}: {
  technology: string;
  techName: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
  };

  const handleClick = () => {
    // Close any other open tooltip
    if (activeTooltipSetter && activeTooltipSetter !== setShowTooltip) {
      activeTooltipSetter(false);
    }

    // Toggle current tooltip
    const newState = !showTooltip;
    setShowTooltip(newState);

    // Update the active tooltip reference
    activeTooltipSetter = newState ? setShowTooltip : null;
  };

  return (
    <div
      className="flex items-center relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      <img
        src={technology}
        alt={techName}
        className="w-8 h-8 object-contain rounded-sm cursor-pointer"
        onError={handleImageError}
      />
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
          {techName}
        </div>
      )}
    </div>
  );
}
