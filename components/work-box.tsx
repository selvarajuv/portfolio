"use client"

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import WoodenBox from "./wooden-box"

interface WorkBoxProps {
  className?: string
  imageUrl?: string
  imageAlt?: string
  topContent?: string
  bottomContent?: string
  hoverContent?: string
  slug?: string
}

export default function WorkBox({
  className = "",
  imageUrl,
  imageAlt = "Project image",
  topContent = "",
  bottomContent = "",
  hoverContent = "Click to explore",
  slug = "",
}: WorkBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/projects/${slug}`}>
      <WoodenBox
        className={className}
        width="380px"
        height="420px"
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner container with reduced dimensions to account for padding */}
        <div
          className="bg-gray-900 overflow-hidden rounded-md"
          style={{
            width: "330px",
            height: "370px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Image container that spans the full width of the inner box */}
          <div className="relative w-full overflow-hidden h-[235px]">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className={`object-cover transition-transform duration-700 ease-in-out ${isHovered ? "scale-110" : "scale-100"}`}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                <span
                  className={`transition-transform duration-700 ease-in-out ${isHovered ? "scale-110" : "scale-100"}`}
                >
                  Image Area (330×235)
                </span>
              </div>
            )}
          </div>

          {/* Bottom section with secondary color background */}
          <div
            className="w-full h-[135px] flex justify-center items-center bg-[#014421]"
            style={{ backdropFilter: "blur(4px)" }}
          >
            {/* Transparent container div */}
            <div className="bg-transparent rounded flex flex-col" style={{ width: "275px", height: "70px" }}>
              {/* Top box with larger white text - no border */}
              <div className="flex-1 flex items-center justify-start">
                {topContent ? (
                  <p className="text-white px-4 text-left font-medium text-2xl truncate">{topContent}</p>
                ) : (
                  <p className="text-white px-4 text-left font-medium text-2xl truncate">Project Title</p>
                )}
              </div>

              {/* Bottom box with text that changes on hover */}
              <div className="flex-1 relative overflow-hidden">
                {/* Default text */}
                <div
                  className={`absolute inset-0 flex items-center px-4 transition-transform duration-300 ${
                    isHovered ? "-translate-y-full" : "translate-y-0"
                  }`}
                >
                  <p className="text-white text-left text-sm truncate">{bottomContent || "View Project"}</p>
                </div>

                {/* Hover text that rolls in from bottom */}
                <div
                  className={`absolute inset-0 flex items-center px-4 transition-transform duration-300 ${
                    isHovered ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <p className="text-white text-left text-sm truncate">{hoverContent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WoodenBox>
    </Link>
  )
}
