// app/page.tsx

"use client";

import { useEffect } from "react";
import PageLayout from "@/components/layout/page-layout";
import HeroSection from "@/components/sections/hero/hero-section";
import ProjectSection from "@/components/sections/project/project-section";
import ExperienceSection from "@/components/sections/experience/experience-section";
import SkillsSection from "@/components/sections/skill/skill-section";
import { scrollToElement } from "@/lib/scroll";

export default function Home() {
  // Handle direct navigation to work section from project pages
  useEffect(() => {
    const shouldScrollToWork = sessionStorage.getItem("scrollToWork");
    if (shouldScrollToWork) {
      sessionStorage.removeItem("scrollToWork");
      scrollToElement("work");
      window.history.replaceState(null, "", "#work");
    }
  }, []);

  return (
    <PageLayout activeSection="home">
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillsSection />
    </PageLayout>
  );
}
