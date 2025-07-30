// components/sections/hero/profile-image.tsx

"use client";

// External imports
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// Constants
const PROFILE_IMAGE_PATH = "/images/profile.jpg";
const FALLBACK_SIZE = {
  container: "w-20 h-20",
  icon: "w-10 h-10",
};

type ProfileImageProps = {
  image?: string;
  isLoading?: boolean;
};

export default function ProfileImage({
  image = "",
  isLoading = false,
}: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Reset image loading state when image prop changes
  useEffect(() => {
    if (image) {
      setIsImageLoading(true);
      setHasError(false);
    }
  }, [image]);

  const handleImageError = () => {
    setHasError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Show skeleton only if data is loading
  if (isLoading) {
    return <ProfileImageSkeleton />;
  }

  // If no image provided or error, show fallback
  if (!image || hasError) {
    return <ProfileImageFallback />;
  }

  // Show image (with loading state while it loads)
  return (
    <ProfileImageContent
      image={image}
      isImageLoading={isImageLoading}
      onImageError={handleImageError}
      onImageLoad={handleImageLoad}
    />
  );
}

// ===== State Components =====

function ProfileImageSkeleton() {
  return (
    <div className="w-full h-full bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
      <div className="bg-gray-700 rounded-full w-24 h-24 animate-pulse" />
    </div>
  );
}

// ===== Main Content Component =====

function ProfileImageContent({
  image,
  isImageLoading,
  onImageError,
  onImageLoad,
}: {
  image: string;
  isImageLoading: boolean;
  onImageError: () => void;
  onImageLoad: () => void;
}) {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg relative bg-gray-800">
      {/* Show skeleton while image is loading */}
      {isImageLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center z-10">
          <div className="bg-gray-700 rounded-full w-24 h-24 animate-pulse" />
        </div>
      )}

      {/* Image */}
      <img
        src={image}
        alt=""
        className={cn(
          "w-full h-full object-cover object-center transition-opacity duration-300",
          isImageLoading ? "opacity-0" : "opacity-100"
        )}
        onError={onImageError}
        onLoad={onImageLoad}
        loading="eager"
      />
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
