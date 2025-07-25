"use client";

import { useEffect } from "react";
import TypewriterTitle from "@/components/sections/hero/typewriter-title";
import SkillsGrid from "@/components/sections/skill/skill-grid";
import PageLayout from "@/components/layout/page-layout";
import WoodenBox from "@/components/forest-theme/wood-box";
import ProfileVineFrame from "@/components/sections/hero/profile-vine-frame";
import ExperienceSection from "@/components/sections/experience/experience-section";
import ProjectSection from "@/components/sections/project/project-section";
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
      className="flex"
      style={{ paddingTop: "clamp(32px, 6vw, 96px)" }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between"
        style={{
          width: "70vw",
          gap: "4vw",
        }}
      >
        {/* Text Content */}
        <div className="mx-auto lg:mx-0 lg:mb-0">
          {/* Container with relative positioning and fixed height */}
          <div
            className="relative"
            style={{
              height: "clamp(120px, 12vw, 160px)", // Adjust based on your title size
              marginBottom: "1rem",
            }}
          >
            <div className="absolute inset-0">
              <TypewriterTitle />
            </div>
          </div>

          <p
            className="text-gray-300 leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
            }}
          >
            I'm a software engineer with 7+ years of experience building
            scalable web applications. I specialize in React, Node.js, and cloud
            technologies. Currently co-founding Life Coach Elevate and working
            with clients worldwide.
          </p>
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center lg:justify-end">
          {/* <ProfileVineFrame /> */}
          <WoodenBox
            width={`clamp(400px, 45vw, 540px)`}
            height={`clamp(450px, 53vw, 630px)`}
            className="lg:!w-[clamp(300px,25vw,540px)] lg:!h-[clamp(350px,29vw,630px)]"
          >
            <ProfileImage />
          </WoodenBox>
        </div>
      </div>
    </section>
  );
}

function ProfileImage() {
  // Replace this with your actual image path
  const profileImagePath = "/images/profile.jpg";

  return (
    <div className="w-full h-full overflow-hidden rounded-lg">
      <img
        src={profileImagePath}
        alt="Vichu - Software Engineer"
        className="w-full h-full object-cover"
        style={{
          objectPosition: "center center",
        }}
        onError={(e) => {
          // Fallback if image doesn't exist
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />

      {/* Fallback placeholder */}
      <div
        className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400 rounded-lg"
        style={{ display: "none" }}
      >
        <div className="bg-gray-700 rounded-full mb-4 flex items-center justify-center w-20 h-20">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <p className="text-center text-sm">
          Profile Picture
          <br />
          (Add image to /images/profile.jpg)
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
