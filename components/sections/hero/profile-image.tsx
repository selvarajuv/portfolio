// components/sections/hero/profile-image.tsx

"use client";

import React, { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

// Constants
const PROFILE_IMAGE_PATH = "/images/profile.jpg";
const FALLBACK_SIZE = {
  container: "w-20 h-20",
  icon: "w-10 h-10",
};

export default function ProfileImage() {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <ProfileImageContent hasError={hasError} onImageError={handleImageError} />
  );
}

// ===== Main Content Component =====

function ProfileImageContent({
  hasError,
  onImageError,
}: {
  hasError: boolean;
  onImageError: () => void;
}) {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg">
      {/* Main Image */}
      {!hasError && (
        <img
          src={PROFILE_IMAGE_PATH}
          alt="Vichu - Software Engineer"
          className="w-full h-full object-cover object-center"
          onError={onImageError}
          loading="eager"
        />
      )}

      {/* Fallback placeholder */}
      {hasError && <ProfileImageFallback />}
    </div>
  );
}

// ===== Sub Components =====

function ProfileImageFallback() {
  return (
    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center text-gray-400 rounded-lg">
      <div
        className={cn(
          "bg-gray-700 rounded-full mb-4 flex items-center justify-center",
          FALLBACK_SIZE.container
        )}
      >
        <User className={FALLBACK_SIZE.icon} aria-hidden="true" />
      </div>
      <p className="text-center text-sm px-4">
        Profile Picture
        <br />
        <span className="text-xs opacity-75">
          (Add image to {PROFILE_IMAGE_PATH})
        </span>
      </p>
    </div>
  );
}
