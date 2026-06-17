/**
 * Available font keys for the project.
 */
export type FontKey = "geist" | "dm-sans" | "inter" | "jetbrains-mono"

/**
 * Configuration for a font family.
 */
export interface FontConfig {
  /** Human-readable name */
  name: string
  /** Google Font name (for next/font/google) */
  googleFont: string
  /** CSS variable name for the font family */
  variable: string
}

/**
 * Registry of available fonts and their configurations.
 */
export const FONT_REGISTRY: Record<FontKey, FontConfig> = {
  geist: {
    name: "Geist",
    googleFont: "Geist",
    variable: "--font-geist",
  },
  "dm-sans": {
    name: "DM Sans",
    googleFont: "DM+Sans",
    variable: "--font-dm-sans",
  },
  inter: {
    name: "Inter",
    googleFont: "Inter",
    variable: "--font-inter",
  },
  "jetbrains-mono": {
    name: "JetBrains Mono",
    googleFont: "JetBrains+Mono",
    variable: "--font-jetbrains-mono",
  },
}
