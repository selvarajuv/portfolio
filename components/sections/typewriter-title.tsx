"use client"

import { useState, useEffect } from "react"

const descriptions = ["a software engineer", "a NBA fan", "a tech enthusiast", "a problem solver"]

export default function TypewriterTitle() {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentDescription = descriptions[currentDescriptionIndex]

    const timeout = setTimeout(
      () => {
        if (isPaused) {
          // Pause for 2 seconds before starting to delete
          setIsPaused(false)
          setIsDeleting(true)
          return
        }

        if (isDeleting) {
          // Deleting characters
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            // Finished deleting, move to next description
            setIsDeleting(false)
            setCurrentDescriptionIndex((prev) => (prev + 1) % descriptions.length)
          }
        } else {
          // Typing characters
          if (currentText.length < currentDescription.length) {
            setCurrentText(currentDescription.slice(0, currentText.length + 1))
          } else {
            // Finished typing, pause before deleting
            setIsPaused(true)
          }
        }
      },
      isDeleting ? 50 : isPaused ? 2000 : 100,
    ) // Faster deletion, pause for 2s, normal typing speed

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentDescriptionIndex])

  return (
    <div className="h-[160px] flex items-start mb-8">
      <h1 className="text-6xl font-bold text-white leading-tight inline-block">
        Hi I'm Vichu, {currentText}
        <span className="animate-pulse inline-block w-[4px] h-[1em] bg-white ml-1 align-middle"></span>
      </h1>
    </div>
  )
}
