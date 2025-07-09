"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WorkBox from "@/components/project/work-box";
import ExperienceCard from "@/components/sections/experience-card";
import TypewriterTitle from "@/components/sections/typewriter-title";
import SkillsGrid from "@/components/sections/skills-grid";
import PageLayout from "@/components/layout/page-layout";
import WoodenBox from "@/components/decorative/wooden-box";
import ProfileVineFrame from "@/components/sections/profile-vine-frame";
import projects from "@/data/projects";
import { getExperienceFromNotion, type ExperienceItem } from "@/lib/experience";
import Image from "next/image";

export default function Home() {
  // Experience data state
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [experienceLoading, setExperienceLoading] = useState(true);
  const [experienceError, setExperienceError] = useState<string | null>(null);

  // Experience card expansion state
  const [expandedCard, setExpandedCard] = useState<string>("");

  // Load experience data
  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await getExperienceFromNotion();
        setExperience(data);
      } catch (error) {
        console.error("Failed to load experience:", error);
        setExperienceError("Failed to load experience data");
      } finally {
        setExperienceLoading(false);
      }
    };

    loadExperience();
  }, []);

  // Handle experience card toggle
  const handleCardToggle = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? "" : cardId);
  };

  // Handle direct navigation to work section from project pages
  useEffect(() => {
    const shouldScrollToWork = sessionStorage.getItem("scrollToWork");
    if (shouldScrollToWork) {
      sessionStorage.removeItem("scrollToWork");
      const workElement = document.getElementById("work");
      if (workElement) {
        workElement.scrollIntoView({ behavior: "auto", block: "start" });
        window.history.replaceState(null, "", "#work");
      }
    }
  }, []);

  return (
    <PageLayout activeSection="home">
      {/* Home/Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center px-4 md:px-8 pb-24"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <TypewriterTitle />
            <p className="text-xl text-gray-300 leading-relaxed">
              I'm a software engineer with 7+ years of experience building
              scalable web applications. I specialize in React, Node.js, and
              cloud technologies. Currently co-founding Life Coach Elevate and
              working with clients worldwide.
            </p>
          </div>
          <div className="relative ml-16">
            <ProfileVineFrame />
            <WoodenBox width="540px" height="630px">
              <div
                className="bg-gray-900 overflow-hidden rounded-md flex items-center justify-center"
                style={{
                  width: "490px",
                  height: "580px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
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
            </WoodenBox>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h1 className="text-8xl font-bold mb-10 tracking-tight leading-none">
                My
                <br />
                Work
              </h1>
              <p className="mb-8 text-lg text-gray-300 leading-relaxed">
                Deployed scalable travel, event and telemedicine web and hybrid
                mobile apps using React SPA and PWA. Collaborated in 140+
                projects with 50+ clients all around the world. I am also
                interested in data analytics and visualization.
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-400 mb-4">Featured Project</p>
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/cairn-featured.png"
                  alt="Cairn Travel Planner - Barcelona Trip Planning Interface"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Cairn Travel Planner
                </h2>
                <Button className="bg-[#014421] hover:bg-[#016428] text-white w-fit">
                  View Project
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-16 mt-16">
            {Object.values(projects).map((project) => (
              <WorkBox
                key={project.id}
                size="default"
                topContent={project.topContent}
                bottomContent={project.bottomContent}
                hoverContent={project.hoverContent}
                imageUrl={project.imageUrl}
                slug={project.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl font-bold mb-16 tracking-tight leading-none text-center">
            Experience
          </h1>

          {experienceLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Loading experience...</div>
            </div>
          )}

          {experienceError && (
            <div className="text-center py-12">
              <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
                {experienceError}
              </div>
            </div>
          )}

          {!experienceLoading && !experienceError && (
            <div className="space-y-6">
              {experience.map((item) => (
                <ExperienceCard
                  key={item.id}
                  {...item}
                  isExpanded={expandedCard === item.id}
                  onToggle={handleCardToggle}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skill" className="py-24 px-4 md:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl font-bold mb-16 tracking-tight leading-none text-center">
            Skills
          </h1>
          <SkillsGrid />
        </div>
      </section>
    </PageLayout>
  );
}
