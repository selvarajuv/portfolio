// components/sections/project/project-details-list.tsx

"use client";

// UI components
import { Badge } from "@/components/ui/badge";

// Utils
import { cn } from "@/lib/utils";

type ProjectDetailsListProps = {
  title: string;
  items: string[];
  type: "challenge" | "outcome";
};

export default function ProjectDetailsList({
  title,
  items,
  type,
}: ProjectDetailsListProps) {
  if (!items || items.length === 0) {
    return <ProjectDetailsListEmpty title={title} />;
  }

  return <ProjectDetailsListContent title={title} items={items} type={type} />;
}

// ===== State Components =====

function ProjectDetailsListEmpty({ title }: { title: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 italic">No items to display</p>
    </div>
  );
}

// ===== Main Content Component =====

function ProjectDetailsListContent({
  title,
  items,
  type,
}: ProjectDetailsListProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <ProjectDetailsListItem key={index} item={item} type={type} />
        ))}
      </ul>
    </div>
  );
}

// ===== Sub Components =====

function ProjectDetailsListItem({
  item,
  type,
}: {
  item: string;
  type: "challenge" | "outcome";
}) {
  return (
    <li className="flex items-start gap-3 text-gray-300">
      <Badge
        variant={type === "challenge" ? "destructive" : "default"}
        className={cn(
          "mt-2 w-1 h-1 p-0 rounded-full",
          "bg-[var(--accent-primary)]"
        )}
      >
        <span className="sr-only">
          {type === "challenge" ? "Challenge" : "Success"}
        </span>
      </Badge>
      <span>{item}</span>
    </li>
  );
}
