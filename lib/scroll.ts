// lib/scroll.ts

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}

export function isElementInViewport(element: HTMLElement, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
