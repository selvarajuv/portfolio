"use client"
import { useState } from "react"
import SkillIcon from "../common/skill-icon"
import skills from "@/data/skills"

// Helper function to group skills into rows
function groupSkillsIntoRows<T>(items: T[], itemsPerRow = 7): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow))
  }
  return rows
}

export default function SkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const skillRows = groupSkillsIntoRows(skills, 7)

  return (
    <div className="w-full relative">
      {/* Vine decorations around the skills box - refined like profile picture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ left: "-30px", top: "-30px", right: "-30px", bottom: "-30px" }}
      >
        {/* Top vines - closer to frame */}
        <div
          className="absolute"
          style={{
            top: "-20px",
            left: "60px",
            width: "80px",
            height: "120px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.3,
            transform: "rotate(-15deg) scale(0.6)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-15px",
            left: "200px",
            width: "85px",
            height: "130px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.32,
            transform: "rotate(-20deg) scale(0.65)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-10px",
            right: "200px",
            width: "90px",
            height: "140px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.35,
            transform: "rotate(25deg) scale(0.7) scaleX(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-15px",
            right: "60px",
            width: "85px",
            height: "130px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.32,
            transform: "rotate(-20deg) scale(0.65)",
          }}
        />

        {/* Left side vines - tighter to frame */}
        <div
          className="absolute"
          style={{
            top: "80px",
            left: "-25px",
            width: "100px",
            height: "150px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.33,
            transform: "rotate(-45deg) scale(0.75)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "280px",
            left: "-20px",
            width: "95px",
            height: "140px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.31,
            transform: "rotate(-35deg) scale(0.7) scaleX(-1)",
          }}
        />

        {/* Right side vines - tighter to frame */}
        <div
          className="absolute"
          style={{
            top: "80px",
            right: "-25px",
            width: "95px",
            height: "145px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.34,
            transform: "rotate(45deg) scale(0.72) scaleX(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "280px",
            right: "-20px",
            width: "90px",
            height: "135px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.32,
            transform: "rotate(35deg) scale(0.69)",
          }}
        />

        {/* Bottom vines - closer to frame */}
        <div
          className="absolute"
          style={{
            bottom: "-20px",
            left: "80px",
            width: "85px",
            height: "125px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.31,
            transform: "rotate(15deg) scale(0.67) scaleY(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-15px",
            left: "220px",
            width: "90px",
            height: "135px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.33,
            transform: "rotate(-25deg) scale(0.7) scaleY(-1) scaleX(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-10px",
            right: "220px",
            width: "80px",
            height: "120px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.29,
            transform: "rotate(20deg) scale(0.64) scaleY(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "-25px",
            right: "80px",
            width: "75px",
            height: "115px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.27,
            transform: "rotate(-30deg) scale(0.61) scaleY(-1) scaleX(-1)",
          }}
        />

        {/* Corner accent vines - smaller and tighter */}
        <div
          className="absolute"
          style={{
            top: "40px",
            left: "40px",
            width: "70px",
            height: "105px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.25,
            transform: "rotate(-60deg) scale(0.5)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "40px",
            right: "40px",
            width: "70px",
            height: "105px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.25,
            transform: "rotate(60deg) scale(0.5) scaleX(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "40px",
            left: "40px",
            width: "70px",
            height: "105px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.25,
            transform: "rotate(60deg) scale(0.5) scaleY(-1)",
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: "40px",
            right: "40px",
            width: "70px",
            height: "105px",
            backgroundImage: "url('/vine-decoration.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.25,
            transform: "rotate(-60deg) scale(0.5) scaleY(-1) scaleX(-1)",
          }}
        />
      </div>

      {/* Skills Grid Container with Recessed Box */}
      <div
        className="rounded-xl p-8 relative z-10"
        style={{
          backgroundColor: "#2d1810",
          boxShadow: `
            inset 0 0 40px rgba(0, 0, 0, 0.9),
            inset 0 0 80px rgba(0, 0, 0, 0.7),
            inset 0 0 120px rgba(0, 0, 0, 0.4)
          `,
        }}
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

        {/* Skills Grid with Shelves */}
        <div className="relative z-10">
          {skillRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative mb-8 last:mb-0"
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Full-width highlight background */}
              <div
                className="absolute inset-0 -inset-x-8 rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: hoveredRow === rowIndex ? "#5e301a" : "transparent",
                  boxShadow:
                    hoveredRow === rowIndex
                      ? `
                      inset 0 0 40px rgba(0, 0, 0, 0.9),
                      inset 0 0 80px rgba(0, 0, 0, 0.7),
                      inset 0 0 120px rgba(0, 0, 0, 0.4)
                    `
                      : "none",
                  top: rowIndex === 0 ? "-16px" : "-20px", // Extend to top of container or previous shelf
                  bottom: "-16px", // Extend to include shelf and shadow
                }}
              >
                {/* Wood grain pattern overlay for hovered row */}
                {hoveredRow === rowIndex && (
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
                )}
              </div>

              {/* Row of Skills */}
              <div className="flex flex-wrap justify-center gap-8 relative z-10" style={{ paddingBottom: "8px" }}>
                {row.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group cursor-pointer transition-all duration-300 flex flex-col items-center"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Name Label - Above the icon with increased margin */}
                    <div className="text-center mb-4">
                      <p
                        className="text-sm font-medium transition-colors duration-300"
                        style={{
                          color:
                            hoveredSkill === skill.name ? skill.color : hoveredRow === rowIndex ? "#f0f0f0" : "#ffffff",
                        }}
                      >
                        {skill.name}
                      </p>
                    </div>

                    {/* Skill Icon - Sits on top of the shelf */}
                    <div
                      className="transition-all duration-300"
                      style={{
                        transform:
                          hoveredSkill === skill.name
                            ? "translateY(-6px) scale(1.1)"
                            : hoveredRow === rowIndex
                              ? "translateY(-3px) scale(1.05)"
                              : "translateY(0) scale(1)",
                        filter:
                          hoveredSkill === skill.name
                            ? `drop-shadow(0 12px 24px ${skill.color}40)`
                            : hoveredRow === rowIndex
                              ? `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))`
                              : "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))",
                      }}
                    >
                      <SkillIcon
                        name={skill.name}
                        iconPath={skill.iconPath}
                        color={skill.color}
                        size={96}
                        isHovered={hoveredSkill === skill.name}
                        isRowHovered={hoveredRow === rowIndex}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Shelf Line */}
              <div
                className="w-full h-2 rounded-sm relative z-10"
                style={{
                  background: `linear-gradient(to bottom, 
                    #8B4513 0%, 
                    #A0522D 20%, 
                    #8B4513 40%, 
                    #654321 60%, 
                    #4A2C17 80%, 
                    #2F1B0C 100%
                  )`,
                  boxShadow: `
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(139, 69, 19, 0.8),
                    inset 0 -1px 0 rgba(47, 27, 12, 0.8)
                  `,
                }}
              />

              {/* Shelf Support Shadow */}
              <div
                className="w-full h-1 mt-1 relative z-10"
                style={{
                  background: `linear-gradient(to bottom, 
                    rgba(0, 0, 0, 0.4) 0%, 
                    rgba(0, 0, 0, 0.2) 50%, 
                    transparent 100%
                  )`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
