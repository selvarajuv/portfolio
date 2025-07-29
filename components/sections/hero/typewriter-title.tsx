// components/sections/hero/typewriter-title.tsx

"use client";

// External imports
import React, { useState, useEffect } from "react";

// Hooks
import { useMisc } from "@/hooks/use-misc";

// Constants
const DEFAULT_DESCRIPTIONS = [
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

// Custom Hook
function useTypewriter(texts: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) {
      // No texts to type, reset state if needed and exit early
      if (currentText !== "") setCurrentText("");
      if (isDeleting) setIsDeleting(false);
      if (isPaused) setIsPaused(false);
      return;
    }

    const currentFullText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.slice(0, currentText.length + 1));
          } else {
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
  const { miscs, loading, error } = useMisc();

  // Loading state
  if (loading) {
    return <TypewriterTitleSkeleton />;
  }

  // Error state - fallback to defaults
  if (error) {
    return <TypewriterTitleContent typewriterTitles={DEFAULT_DESCRIPTIONS} />;
  }

  // Empty state - fallback to defaults
  if (
    !miscs ||
    miscs.length === 0 ||
    !miscs[0].typewriterTitles ||
    miscs[0].typewriterTitles.length === 0
  ) {
    return <TypewriterTitleContent typewriterTitles={DEFAULT_DESCRIPTIONS} />;
  }

  // Success state
  const typewriterTitles = miscs[0].typewriterTitles;
  return <TypewriterTitleContent typewriterTitles={typewriterTitles} />;
}

// ===== State Components =====

function TypewriterTitleSkeleton() {
  const titleStyles = {
    fontSize: "clamp(2.3rem, 3.5vw, 4rem)",
    paddingBottom: "clamp(0.5rem, 1vw, 1rem)",
  };

  return (
    <div className="flex items-start mb-8">
      <h1
        className="font-bold text-white leading-tight inline-flex items-center gap-2"
        style={titleStyles}
      >
        Hi I'm Vichu
        <span className="inline-flex gap-[4px] ml-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
        </span>
      </h1>
    </div>
  );
}

// ===== Main Content Component =====

function TypewriterTitleContent({
  typewriterTitles,
}: {
  typewriterTitles: string[];
}) {
  const currentText = useTypewriter(typewriterTitles);

  const titleStyles = {
    fontSize: "clamp(2.3rem, 3.5vw, 4rem)",
    paddingBottom: "clamp(0.5rem, 1vw, 1rem)",
  };

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
