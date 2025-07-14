// components/sections/project/work-description.tsx

import { cn } from "@/lib/utils";

export default function WorkDescription() {
  return (
    <div>
      <h1
        className={cn("text-8xl font-bold mb-10 tracking-tight leading-none")}
      >
        My
        <br />
        Work
      </h1>
      <p className="mb-8 text-lg text-gray-300 leading-relaxed">
        Deployed scalable travel, event and telemedicine web and hybrid mobile
        apps using React SPA and PWA. Collaborated in 140+ projects with 50+
        clients all around the world. I am also interested in data analytics and
        visualization.
      </p>
    </div>
  );
}
