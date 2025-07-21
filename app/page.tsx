"use client";

import { useEffect } from "react";
import TypewriterTitle from "@/components/sections/hero/typewriter-title";
import SkillsGrid from "@/components/sections/skill/skill-grid";
import PageLayout from "@/components/layout/page-layout";
import WoodenBox from "@/components/forest-theme/wood-box";
import ProfileVineFrame from "@/components/sections/hero/profile-vine-frame";
import ExperienceSection from "@/components/sections/experience/experience-section";
import ProjectSection from "@/components/sections/project/project-section"; // ← New import
import { cn } from "@/lib/utils";
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
      {/* <ProjectSection /> */}
      {/* <ExperienceSection /> */}
      {/* <SkillsSection /> */}
    </PageLayout>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 md:px-8 pb-24"
    >
      {/* <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <TypewriterTitle />
          <p className="text-xl text-gray-300 leading-relaxed">
            I'm a software engineer with 7+ years of experience building
            scalable web applications. I specialize in React, Node.js, and cloud
            technologies. Currently co-founding Life Coach Elevate and working
            with clients worldwide.
          </p>
        </div>
        <div className="relative ml-16">
          <ProfileVineFrame />
          <WoodenBox width="540px" height="630px">
            <ProfilePlaceholder />
          </WoodenBox>
        </div>
      </div> */}
    </section>
  );
}

function ProfilePlaceholder() {
  return (
    <div
      className={cn(
        "bg-gray-900 overflow-hidden rounded-md",
        "flex items-center justify-center"
      )}
      style={{
        width: "490px",
        height: "580px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        className={cn(
          "w-full h-full bg-gray-800",
          "flex flex-col items-center justify-center text-gray-400"
        )}
      >
        <div
          className={cn(
            "w-24 h-24 bg-gray-700 rounded-full mb-4",
            "flex items-center justify-center"
          )}
        >
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <p className="text-center text-sm">
          Profile Picture
          <br />
          (490×580)
        </p>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skill" className={cn("section-spacing px-4 md:px-8 pb-32")}>
      <div className="max-w-6xl mx-auto">
        <h1
          className={cn(
            "text-7xl font-bold mb-16 tracking-tight leading-none text-center"
          )}
        >
          Skills
        </h1>
        <SkillsGrid />
      </div>
    </section>
  );
}
