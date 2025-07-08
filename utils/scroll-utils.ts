/**
 * Utility functions for scrolling behavior
 */

/**
 * Scroll to the top of the page smoothly
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

/**
 * Scroll to a specific element by ID
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element (in pixels)
 */
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    })
  }
}

/**
 * Check if an element is in the viewport
 * @param element The element to check
 * @param offset Optional offset from the top of the viewport (in pixels)
 */
export function isElementInViewport(element: HTMLElement, offset = 0) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
