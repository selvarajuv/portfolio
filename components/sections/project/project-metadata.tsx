// components/sections/project/project-metadata.tsx

type ProjectMetadataProps = {
  title: string;
  content: React.ReactNode;
};

export default function ProjectMetadata({
  title,
  content,
}: ProjectMetadataProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {typeof content === "string" ? (
        <p className="text-gray-300">{content}</p>
      ) : (
        content
      )}
    </div>
  );
}
