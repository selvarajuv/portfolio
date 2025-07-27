// components/sections/experience/experience-card.tsx

"use client";

import { Plus, Minus, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import { ExperienceItem } from "@/types/experience";
import { useExperienceAnimation } from "@/hooks/experience/use-experience-animation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WoodenBox from "@/components/forest-theme/wood-box";

type ExperienceCardProps = ExperienceItem & {
  isExpanded: boolean;
  onToggle: (id: string) => void;
};

type ExperienceCardHeaderProps = {
  title: string;
  company: string;
  period: string;
  isExpanded: boolean;
  onToggle: () => void;
};

type ExperienceCardContentProps = {
  location?: string;
  website?: string;
  description?: string;
  technologies?: string[];
};

type ExperienceCardLogoProps = {
  logo?: string;
  company: string;
};

function ExperienceCardHeader({
  title,
  company,
  period,
  isExpanded,
  onToggle,
}: ExperienceCardHeaderProps) {
  return (
    <div
      className={`w-full text-white p-4 md:p-6 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between cursor-pointer transition-colors ${
        isExpanded ? "bg-[#016428]" : "bg-[#014421]"
      } hover:bg-[#016428]`}
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

function ExperienceCardContent({
  location,
  website,
  description,
  technologies = [],
}: ExperienceCardContentProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Location and website */}
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

      {/* Description */}
      <div className="flex-1 mb-4 md:mb-6">
        {description ? (
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        ) : (
          <p className="text-gray-500 leading-relaxed italic text-sm md:text-base">
            Experience details coming soon...
          </p>
        )}
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
            Technologies TBD
          </Badge>
        )}
      </div>
    </div>
  );
}

function ExperienceCardLogo({ logo, company }: ExperienceCardLogoProps) {
  return (
    <div className="flex-shrink-0 order-first lg:order-last mb-4 lg:mb-0">
      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-lg p-1.5 sm:p-2 flex items-center justify-center mx-auto lg:mx-0">
        {logo ? (
          <img
            src={logo}
            alt={`${company} logo`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-gray-400 text-[10px] sm:text-xs text-center">
            Logo
            <br />
            Coming
            <br />
            Soon
          </div>
        )}
      </div>
    </div>
  );
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
  const [isHovered, setIsHovered] = useState(false);
  const { isAnimating } = useExperienceAnimation(isExpanded);

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
        className={`overflow-hidden transition-all duration-500 linear ${
          isExpanded
            ? "max-h-[600px] sm:max-h-[500px] lg:max-h-[400px] opacity-100 mt-4 md:mt-6 mb-4 md:mb-6"
            : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <Card
          className={`bg-gray-800 border-gray-700 transform transition-all duration-500 linear min-h-[200px] ${
            isAnimating && isExpanded
              ? "translate-y-0 scale-100"
              : "translate-y-[-10px] scale-95"
          }`}
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
