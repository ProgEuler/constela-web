import { themeQuartz, type Theme } from "ag-grid-community"

const LIGHT_FALLBACK = {
  background: "oklch(1 0 0)",
  foreground: "oklch(0.153 0.006 107.1)",
  border: "oklch(0.93 0.007 106.5)",
  muted: "oklch(0.966 0.005 106.5)",
  mutedForeground: "oklch(0.58 0.031 107.3)",
  primary: "oklch(0.508 0.118 165.612)",
  primaryForeground: "oklch(0.979 0.021 166.113)",
  input: "oklch(0.93 0.007 106.5)",
  ring: "oklch(0.737 0.021 106.9)",
  radius: 10,
} as const

function readCssVariable(name: string): string {
  if (typeof document === "undefined") return ""

  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

function readLength(name: string, fallback: number): number {
  const raw = readCssVariable(name)
  if (!raw) return fallback

  if (raw.endsWith("rem")) {
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    )
    return parseFloat(raw) * rootFontSize
  }

  if (raw.endsWith("px")) return parseFloat(raw)

  const numeric = Number.parseFloat(raw)
  return Number.isFinite(numeric) ? numeric : fallback
}

function readColor(name: string, fallback: string): string {
  return readCssVariable(name) || fallback
}

function isDarkMode(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

function readFontFamily(): string[] {
  if (typeof document === "undefined") {
    return ["DM Sans", "sans-serif"]
  }

  const bodyFont = getComputedStyle(document.body).fontFamily
  if (!bodyFont) return ["DM Sans", "sans-serif"]

  return bodyFont
    .split(",")
    .map((font) => font.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean)
}

export function createShadcnAgGridTheme(): Theme {
  const background = readColor("--background", LIGHT_FALLBACK.background)
  const foreground = readColor("--foreground", LIGHT_FALLBACK.foreground)
  const border = readColor("--border", LIGHT_FALLBACK.border)
  const muted = readColor("--muted", LIGHT_FALLBACK.muted)
  const mutedForeground = readColor(
    "--muted-foreground",
    LIGHT_FALLBACK.mutedForeground
  )
  const primary = readColor("--primary", LIGHT_FALLBACK.primary)
  const primaryForeground = readColor(
    "--primary-foreground",
    LIGHT_FALLBACK.primaryForeground
  )
  const input = readColor("--input", LIGHT_FALLBACK.input)
  const ring = readColor("--ring", LIGHT_FALLBACK.ring)
  const radius = readLength("--radius", LIGHT_FALLBACK.radius)
  const inputRadius = readLength("--radius-4xl", radius * 2.6)

  return themeQuartz.withParams({
    accentColor: primary,
    backgroundColor: background,
    foregroundColor: foreground,
    textColor: foreground,
    borderColor: border,
    borderWidth: 1,

    headerBackgroundColor: background,
    headerTextColor: foreground,
    headerFontWeight: 400,
    headerHeight: 48,
    headerFontSize: 14,

    dataBackgroundColor: background,
    oddRowBackgroundColor: background,
    chromeBackgroundColor: background,

    rowHoverColor: `color-mix(in oklch, ${muted} 50%, transparent)`,
    selectedRowBackgroundColor: muted,
    columnHoverColor: `color-mix(in oklch, ${muted} 50%, transparent)`,
    headerCellHoverBackgroundColor: `color-mix(in oklch, ${muted} 50%, transparent)`,

    subtleTextColor: mutedForeground,
    iconColor: mutedForeground,

    rowHeight: 52,
    fontSize: 14,
    dataFontSize: 14,
    fontWeight: 400,
    cellHorizontalPadding: 16,
    spacing: 8,

    borderRadius: radius,
    wrapperBorderRadius: 0,
    wrapperBorder: { width: 1, color: border },
    rowBorder: { width: 1, color: border },

    fontFamily: readFontFamily(),
    browserColorScheme: isDarkMode() ? "dark" : "light",

    headerColumnResizeHandleColor: border,

    inputBackgroundColor: `color-mix(in oklch, ${input} 30%, transparent)`,
    inputBorder: { width: 1, color: input },
    inputBorderRadius: inputRadius,
    inputHeight: 36,
    inputPaddingStart: 12,
    inputTextColor: foreground,
    inputPlaceholderTextColor: mutedForeground,
    inputFocusBorder: { width: 1, color: ring },
    inputFocusShadow: {
      radius: 3,
      spread: 0,
      color: `color-mix(in oklch, ${ring} 50%, transparent)`,
    },

    checkboxBorderRadius: 6,
    checkboxBorderWidth: 1,
    checkboxUncheckedBorderColor: input,
    checkboxUncheckedBackgroundColor: "transparent",
    checkboxCheckedBackgroundColor: primary,
    checkboxCheckedBorderColor: primary,
    checkboxCheckedShapeColor: primaryForeground,
    checkboxIndeterminateBackgroundColor: primary,
    checkboxIndeterminateBorderColor: primary,
    checkboxIndeterminateShapeColor: primaryForeground,

    menuBackgroundColor: readColor("--popover", background),
    menuTextColor: readColor("--popover-foreground", foreground),
    menuBorder: { width: 1, color: border },
    popupShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  })
}
