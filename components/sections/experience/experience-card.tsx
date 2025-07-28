// components/sections/experience/experience-card.tsx

"use client";

import React, { useState } from "react";
import { Plus, Minus, MapPin, Globe } from "lucide-react";
import { ExperienceItem } from "@/types/experience";
import { useExperienceAnimation } from "@/hooks/experience/use-experience-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WoodenBox from "@/components/forest-theme/wood-box";
import { cn } from "@/lib/utils";

// Constants
const PLACEHOLDER_LOGO_TEXT = ["Logo", "Coming", "Soon"];
const PLACEHOLDER_DESCRIPTION = "Experience details coming soon...";
const PLACEHOLDER_TECH = "Technologies TBD";

type ExperienceCardProps = ExperienceItem & {
  isExpanded: boolean;
  onToggle: (id: string) => void;
};

// Header Component
function ExperienceCardHeader({
  title,
  company,
  period,
  isExpanded,
  onToggle,
}: {
  title: string;
  company: string;
  period: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const headerStyles = {
    backgroundColor: isExpanded
      ? "var(--accent-primary)"
      : "var(--accent-secondary)",
  };

  return (
    <div
      className={cn(
        "w-full text-white p-4 md:p-6 rounded-lg cursor-pointer",
        "flex flex-col lg:flex-row lg:items-center justify-between",
        "transition-colors hover:bg-[var(--accent-primary)]"
      )}
      style={headerStyles}
      onClick={onToggle}
    >
      <div className="flex-1 text-left mb-2 lg:mb-0">
        <h3 className="text-lg md:text-xl font-semibold">
          {title} @ {company}
        </h3>
      </div>
      <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-4">
        <span className="text-base md:text-lg font-medium">{period}</span>
        {isExpanded ? (
          <Minus className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Plus className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </div>
    </div>
  );
}

// Content Component
function ExperienceCardContent({
  location,
  website,
  description,
  technologies = [],
}: {
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
}) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Location and website */}
      {(location || website) && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-gray-300 text-sm md:text-base">
          {location && (
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1 sm:gap-2">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[200px] sm:max-w-none">
                {website}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="flex-1 mb-4 md:mb-6">
        <p
          className={cn(
            "leading-relaxed text-sm md:text-base",
            description ? "text-gray-300" : "text-gray-500 italic"
          )}
        >
          {description || PLACEHOLDER_DESCRIPTION}
        </p>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {technologies.length > 0 ? (
          technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
            >
              {tech}
            </Badge>
          ))
        ) : (
          <Badge
            variant="secondary"
            className="bg-gray-600 text-gray-300 text-xs sm:text-sm"
          >
            {PLACEHOLDER_TECH}
          </Badge>
        )}
      </div>
    </div>
  );
}

// Logo Component
function ExperienceCardLogo({
  logo,
  company,
}: {
  logo?: string;
  company: string;
}) {
  const logoContainerSize = {
    width: "clamp(64px, 5vw, 96px)",
    height: "clamp(64px, 5vw, 96px)",
  };

  return (
    <div className="flex-shrink-0 order-first lg:order-last mb-4 lg:mb-0">
      <div
        className="bg-white rounded-lg p-1.5 sm:p-2 flex items-center justify-center mx-auto lg:mx-0"
        style={logoContainerSize}
      >
        {logo ? (
          <img
            src={logo}
            alt={`${company} logo`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400 text-[10px] sm:text-xs text-center">
            {PLACEHOLDER_LOGO_TEXT.map((text, i) => (
              <React.Fragment key={i}>
                {text}
                {i < PLACEHOLDER_LOGO_TEXT.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
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
  const [isHovered, setIsHovered] = useState(false);
  const { isAnimating } = useExperienceAnimation(isExpanded);

  // Animation styles
  const contentContainerStyles = {
    maxHeight: isExpanded ? "600px" : "0",
    opacity: isExpanded ? 1 : 0,
    marginTop: isExpanded ? "1.5rem" : "0",
    marginBottom: isExpanded ? "1.5rem" : "0",
  };

  const cardAnimationStyles = {
    transform:
      isAnimating && isExpanded
        ? "translateY(0) scale(1)"
        : "translateY(-10px) scale(0.95)",
  };

  return (
    <WoodenBox
      isHovered={isExpanded || isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ExperienceCardHeader
        title={title}
        company={company}
        period={period}
        isExpanded={isExpanded}
        onToggle={() => onToggle(id)}
      />

      {/* Expanded content with animation */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          "sm:max-h-[500px] lg:max-h-[400px]"
        )}
        style={contentContainerStyles}
      >
        <Card
          className={cn(
            "bg-gray-800 border-gray-700",
            "transform transition-all duration-500",
            "min-h-[200px]"
          )}
          style={cardAnimationStyles}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-full">
              <ExperienceCardContent
                location={location}
                website={website}
                description={description}
                technologies={technologies}
              />
              <ExperienceCardLogo logo={logo} company={company} />
            </div>
          </CardContent>
        </Card>
      </div>
    </WoodenBox>
  );
}
