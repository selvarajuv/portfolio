"use client"

import type React from "react"

interface WoodenBoxProps {
  children: React.ReactNode
  className?: string
  width?: string | number
  height?: string | number
  isHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const WoodenBox: React.FC<WoodenBoxProps> = ({
  children,
  className = "",
  width = "auto",
  height = "auto",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`overflow-hidden rounded-xl ${className}`}
      style={{
        width,
        height,
        backgroundColor: isHovered ? "#8B4513" : "#3d1f0f",
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default WoodenBox
