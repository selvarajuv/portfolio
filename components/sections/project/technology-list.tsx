// components/sections/project/technology-list.tsx

type TechnologyListProps = {
  technologies: string[];
};

export default function TechnologyList({ technologies }: TechnologyListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((techUrl, index) => (
        <div
          key={index}
          className="flex items-center"
          title={`Technology ${index + 1}`}
        >
          <img
            src={techUrl}
            alt={`Technology ${index + 1}`}
            className="w-8 h-8 object-contain rounded-sm"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ))}
    </div>
  );
}
