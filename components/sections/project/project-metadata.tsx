// components/sections/project/project-metadata.tsx

"use client";

// External imports
import React from "react";

type ProjectMetadataProps = {
  title: string;
  content: React.ReactNode;
};

export default function ProjectMetadata({
  title,
  content,
}: ProjectMetadataProps) {
  if (!content) {
    return <ProjectMetadataEmpty title={title} />;
  }

  return <ProjectMetadataContent title={title} content={content} />;
}

// ===== State Components =====

function ProjectMetadataEmpty({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-500 italic">Not specified</p>
    </div>
  );
}

// ===== Main Content Component =====

function ProjectMetadataContent({ title, content }: ProjectMetadataProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <ProjectMetadataValue content={content} />
    </div>
  );
}

// ===== Sub Components =====

function ProjectMetadataValue({ content }: { content: React.ReactNode }) {
  if (typeof content === "string") {
    return <p className="text-gray-300">{content}</p>;
  }

  return <>{content}</>;
}
