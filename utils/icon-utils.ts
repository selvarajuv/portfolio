export const availableIcons = [
  "typescript",
  "react",
  "nextjs",
  "html5",
  "css3",
  "sass",
  "nodejs",
  "python",
  "php",
  "laravel",
  "graphql",
  "symfony",
  "mysql",
  "postgresql",
  "mongodb",
  "aws",
  "docker",
  "linux",
  "git",
  "jenkins",
  "kubernetes",
] as const

export type IconName = (typeof availableIcons)[number]

/**
 * Get the path to an icon file
 */
export function getIconPath(iconName: IconName): string {
  return `/icons/${iconName}.svg`
}

/**
 * Check if an icon exists
 */
export function iconExists(iconName: string): iconName is IconName {
  return availableIcons.includes(iconName as IconName)
}

/**
 * Get fallback icon path
 */
export function getFallbackIcon(): string {
  return "/icons/default.svg"
}

/**
 * Validate and get icon path with fallback
 */
export function getValidIconPath(iconName: string): string {
  if (iconExists(iconName)) {
    return getIconPath(iconName)
  }
  return getFallbackIcon()
}
