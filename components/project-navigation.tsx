"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import projects from "@/data/projects"

interface ProjectNavigationProps {
  currentProjectId: string
}

export default function ProjectNavigation({ currentProjectId }: ProjectNavigationProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Get all project IDs
  const projectIds = Object.keys(projects)
  const currentIndex = projectIds.indexOf(currentProjectId)

  // Get next project (loop back to first if at end)
  const nextIndex = (currentIndex + 1) % projectIds.length
  const nextProjectId = projectIds[nextIndex]
  const nextProject = projects[nextProjectId]

  // Get previous project (loop to last if at beginning)
  const prevIndex = currentIndex === 0 ? projectIds.length - 1 : currentIndex - 1
  const prevProjectId = projectIds[prevIndex]
  const prevProject = projects[prevProjectId]

  return (
    <div className="fixed bottom-8 right-8 z-20">
      {/* Hover image preview */}
      {isHovered && nextProject.imageUrl && (
        <div
          className="absolute bottom-full right-0 mb-4 transition-all duration-300 ease-out"
          style={{
            transform: isHovered ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            opacity: isHovered ? 1 : 0,
            width: "280px", // Same as min-width of the box
          }}
        >
          <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={nextProject.imageUrl || "/placeholder.svg"}
              alt={`${nextProject.title} preview`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Navigation component */}
      <div
        className="rounded-xl p-6 cursor-pointer transition-all duration-300 min-w-[280px]"
        style={{
          backgroundColor: isHovered ? "#5e301a" : "#3d1f0f",
          boxShadow: isHovered
            ? `
              inset 0 0 40px rgba(0, 0, 0, 0.9),
              inset 0 0 80px rgba(0, 0, 0, 0.7),
              inset 0 0 120px rgba(0, 0, 0, 0.4),
              0 8px 32px rgba(0, 0, 0, 0.5)
            `
            : `
              inset 0 0 30px rgba(0, 0, 0, 0.8),
              inset 0 0 60px rgba(0, 0, 0, 0.6),
              inset 0 0 100px rgba(0, 0, 0, 0.3),
              0 4px 16px rgba(0, 0, 0, 0.3)
            `,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Wood grain pattern overlay */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundImage: "url('/wood-grain-pattern.png')",
            backgroundSize: "600px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            opacity: 0.07,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with navigation arrows */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">Next Project</span>
            <div className="flex items-center gap-2">
              <Link href={`/projects/${prevProjectId}`}>
                <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-[#016428] transition-colors cursor-pointer" />
              </Link>
              <Link href={`/projects/${nextProjectId}`}>
                <ChevronRight className="w-5 h-5 text-gray-400 hover:text-[#016428] transition-colors cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Project title */}
          <Link href={`/projects/${nextProjectId}`}>
            <h3 className="text-white text-lg font-semibold leading-tight hover:text-[#016428] transition-colors">
              {nextProject.title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
