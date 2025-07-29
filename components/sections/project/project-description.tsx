// components/sections/project/work-description.tsx

"use client";

// Hooks
import { useMisc } from "@/hooks/use-misc";

// Utils
import { cn } from "@/lib/utils";

export default function WorkDescription() {
  const { miscs, loading, error } = useMisc();

  // Loading state
  if (loading) {
    return <WorkDescriptionSkeleton />;
  }

  // Error state
  if (error) {
    return <WorkDescriptionError error={error} />;
  }

  // Empty state
  if (!miscs || miscs.length === 0 || !miscs[0].workDescription) {
    return <WorkDescriptionEmpty />;
  }

  // Success state
  const workDescription = miscs[0].workDescription;
  return <WorkDescriptionContent workDescription={workDescription} />;
}

// ===== State Components =====

function WorkDescriptionSkeleton() {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
        style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        My
        <br />
        Work
      </h1>

      <div className="space-y-3 animate-pulse">
        <div className="h-5 bg-gray-500/20 rounded w-full" />
        <div className="h-5 bg-gray-500/20 rounded w-11/12" />
        <div className="h-5 bg-gray-500/20 rounded w-4/5" />
        <div className="h-5 bg-gray-500/20 rounded w-3/4" />
      </div>
    </div>
  );
}

function WorkDescriptionError({ error }: { error: string }) {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
        style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        My
        <br />
        Work
      </h1>

      <p className="text-red-400 text-lg">
        Failed to load work description. Please refresh the page.
      </p>
    </div>
  );
}

function WorkDescriptionEmpty() {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
        style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        My
        <br />
        Work
      </h1>

      <p
        className="mb-8 text-lg text-gray-300 leading-relaxed"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
        }}
      >
        Explore my portfolio of projects showcasing various technologies and
        solutions I've built.
      </p>
    </div>
  );
}

// ===== Main Content Component =====

function WorkDescriptionContent({
  workDescription,
}: {
  workDescription: string;
}) {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
        style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        My
        <br />
        Work
      </h1>

      <p
        className="mb-8 text-lg text-gray-300 leading-relaxed"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
        }}
      >
        {workDescription}
      </p>
    </div>
  );
}
