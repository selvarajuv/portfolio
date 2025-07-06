"use client"

import { Plus, Minus, MapPin, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import WoodenBox from "../decorative/wooden-box"

interface ExperienceCardProps {
  id: string
  title: string
  company: string
  period: string
  location?: string
  website?: string
  description?: string
  technologies?: string[]
  logo?: string
  isExpanded: boolean
  onToggle: (id: string) => void
}

export default function ExperienceCard({
  id,
  title,
  company,
  period,
  location,
  website,
  description,
  technologies = [],
  logo,
  isExpanded,
  onToggle,
}: ExperienceCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
    }
  }, [isExpanded])

  return (
    <WoodenBox
      isHovered={isExpanded || isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header - always visible */}
      <div
        className={`w-full text-white p-6 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
          isExpanded ? "bg-[#016428]" : "bg-[#014421]"
        } hover:bg-[#016428]`}
        onClick={() => onToggle(id)}
      >
        <div className="flex-1 text-left">
          <h3 className="text-xl font-semibold">
            {title} @ {company}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium">{period}</span>
          {isExpanded ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </div>
      </div>

      {/* Expanded content with animation */}
      <div
        className={`overflow-hidden transition-all duration-500 linear ${
          isExpanded ? "max-h-[400px] opacity-100 mt-6 mb-6" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <Card
          className={`bg-gray-800 border-gray-700 transform transition-all duration-500 linear min-h-[200px] ${
            isAnimating && isExpanded ? "translate-y-0 scale-100" : "translate-y-[-10px] scale-95"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* Left content */}
              <div className="flex-1 flex flex-col">
                {/* Location and website */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-300">
                  {location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                  )}
                  {website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{website}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="flex-1 mb-6">
                  {description ? (
                    <p className="text-gray-300 leading-relaxed">{description}</p>
                  ) : (
                    <p className="text-gray-500 leading-relaxed italic">Experience details coming soon...</p>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {technologies.length > 0 ? (
                    technologies.map((tech, index) => (
                      <Badge key={index} variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                      Technologies TBD
                    </Badge>
                  )}
                </div>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center">
                  {logo ? (
                    <img
                      src={logo || "/placeholder.svg"}
                      alt={`${company} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs text-center">
                      Logo
                      <br />
                      Coming
                      <br />
                      Soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </WoodenBox>
  )
}
