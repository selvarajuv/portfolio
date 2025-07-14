// components/sections/project/project-section-component.tsx

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectSectionProps = {
  title: string;
  items: string[];
  type: "challenge" | "outcome";
};

export default function ProjectDetailsList({
  title,
  items,
  type,
}: ProjectSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <Badge
              variant={type === "challenge" ? "destructive" : "default"}
              className={cn(
                "mt-1 w-2 h-2 p-0 rounded-full",
                "bg-[var(--navbar-hover-color)]"
              )}
            >
              <span className="sr-only">
                {type === "challenge" ? "Challenge" : "Success"}
              </span>
            </Badge>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
