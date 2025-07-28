// components/sections/hero/profile-image.tsx

"use client";

import React from "react";
import { User } from "lucide-react";

const PROFILE_IMAGE_PATH = "/images/profile.jpg";

export default function ProfileImage() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) fallback.style.display = "flex";
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-lg">
      {/* Main Image */}
      <img
        src={PROFILE_IMAGE_PATH}
        alt="Vichu - Software Engineer"
        className="w-full h-full object-cover object-center"
        onError={handleImageError}
        loading="eager"
      />

      {/* Fallback placeholder */}
      <div
        className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400 rounded-lg"
        style={{ display: "none" }}
      >
        <div className="bg-gray-700 rounded-full mb-4 flex items-center justify-center w-20 h-20">
          <User className="w-10 h-10" />
        </div>
        <p className="text-center text-sm">
          Profile Picture
          <br />
          <span className="text-xs opacity-75">
            (Add image to {PROFILE_IMAGE_PATH})
          </span>
        </p>
      </div>
    </div>
  );
}
