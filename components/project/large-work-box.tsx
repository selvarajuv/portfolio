"use client"

import Image from "next/image"
import { useState } from "react"

interface LargeWorkBoxProps {
  className?: string
  imageUrl?: string
  imageAlt?: string
  title?: string
  description?: string
  hoverContent?: string
}

export default function LargeWorkBox({
  className = "",
  imageUrl,
  imageAlt = "Project image",
  title = "Project Title",
  description = "View Project",
  hoverContent = "Click to explore",
}: LargeWorkBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Match the bottom section height to the regular WorkBox (135px)
  const bottomBoxHeight = 135 // Same as regular WorkBox
  const imageHeight = 550 - bottomBoxHeight // 550px - 135px = 415px

  return (
    <div
      className={`overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: "800px",
        height: "600px",
        backgroundColor: isHovered ? "#5e301a" : "#3d1f0f",
        padding: "25px",
        position: "relative",
        boxShadow: isHovered
          ? `
    inset 0 0 40px rgba(0, 0, 0, 0.9),
    inset 0 0 80px rgba(0, 0, 0, 0.7),
    inset 0 0 120px rgba(0, 0, 0, 0.4)
  `
          : `
    inset 0 0 30px rgba(0, 0, 0, 0.8),
    inset 0 0 60px rgba(0, 0, 0, 0.6),
    inset 0 0 100px rgba(0, 0, 0, 0.3)
  `,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wood grain pattern overlay with same opacity as main background */}
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

      {/* Inner container with reduced dimensions to account for padding */}
      <div
        className="bg-gray-900 overflow-hidden rounded-md relative z-10"
        style={{
          width: "750px",
          height: "550px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Image container at the top with overflow hidden */}
        <div className="relative w-full overflow-hidden" style={{ height: "415px" }}>
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
                Image Area (750×415)
              </span>
            </div>
          )}
        </div>

        {/* Bottom box for text content - same height as regular WorkBox */}
        <div className="w-full bg-transparent" style={{ height: `${bottomBoxHeight}px` }}>
          <div className="h-full flex flex-col justify-center px-8">
            {/* Title */}
            <div className="mb-3">
              <h3 className="text-white text-3xl font-medium truncate">{title}</h3>
            </div>

            {/* Description with hover effect */}
            <div className="relative overflow-hidden" style={{ height: "30px" }}>
              {/* Default text */}
              <div
                className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                  isHovered ? "-translate-y-full" : "translate-y-0"
                }`}
              >
                <p className="text-white text-base truncate">{description}</p>
              </div>

              {/* Hover text that rolls in from bottom */}
              <div
                className={`absolute inset-0 flex items-center transition-transform duration-300 ${
                  isHovered ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <p className="text-white text-base truncate">{hoverContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
