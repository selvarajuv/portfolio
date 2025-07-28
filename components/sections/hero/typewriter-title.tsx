// components/sections/hero/typewriter-title.tsx

"use client";

import React, { useState, useEffect } from "react";

// Constants
const DESCRIPTIONS = [
  "a software engineer",
  "a NBA fan",
  "a tech enthusiast",
  "a problem solver",
];

const TIMING = {
  typing: 100,
  deleting: 50,
  pause: 2000,
} as const;

// Custom hook for typewriter effect
function useTypewriter(texts: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          // Resume after pause
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          // Delete characters
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Move to next text
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          // Type characters
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.slice(0, currentText.length + 1));
          } else {
            // Pause before deleting
            setIsPaused(true);
          }
        }
      },
      isPaused ? TIMING.pause : isDeleting ? TIMING.deleting : TIMING.typing
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentIndex, texts]);

  return currentText;
}

export default function TypewriterTitle() {
  const currentText = useTypewriter(DESCRIPTIONS);

  // Title styles
  const titleStyles = {
    fontSize: "clamp(2.3rem, 3.5vw, 4rem)",
    paddingBottom: "clamp(0.5rem, 1vw, 1rem)",
  };

  // Cursor styles
  const cursorStyles = {
    width: "clamp(2px, 0.2vw, 4px)",
    height: "1em",
  };

  return (
    <div className="flex items-start mb-8">
      <h1
        className="font-bold text-white leading-tight inline-block"
        style={titleStyles}
      >
        Hi I'm Vichu, {currentText}
        <span
          className="animate-pulse inline-block bg-white ml-1 align-middle"
          style={cursorStyles}
          aria-hidden="true"
        />
      </h1>
    </div>
  );
}
