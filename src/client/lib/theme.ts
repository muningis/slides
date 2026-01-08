/**
 * Default theme configuration - Dark Olive with Lime Accents
 * Military-tech minimalism: precise, commanding, energetic
 */

import type { Theme, ThemeColors } from "../../shared/types/theme.ts";

/** Default color palette - deep olive with lime accents */
const defaultColors: ThemeColors = {
  background: {
    primary: "#1a1f16",
    secondary: "#252b1f",
    tertiary: "#2f3628",
    deep: "#0f1310",
  },
  accent: {
    primary: "#c8f542",
    bright: "#d4ff4a",
    dim: "#a8d435",
    pressed: "#8ab82a",
  },
  text: {
    primary: "#f5f5f0",
    secondary: "#b8b8b0",
    muted: "#787870",
    bright: "#ffffff",
  },
  border: "#3a4230",
};

/** High contrast color palette - enhanced visibility */
const highContrastColors: ThemeColors = {
  background: {
    primary: "#121510",
    secondary: "#1a1f16",
    tertiary: "#252b1f",
    deep: "#0a0c08",
  },
  accent: {
    primary: "#d4ff4a",
    bright: "#e0ff6a",
    dim: "#c8f542",
    pressed: "#a8d435",
  },
  text: {
    primary: "#ffffff",
    secondary: "#e0e0e0",
    muted: "#a0a0a0",
    bright: "#ffffff",
  },
  border: "#5a6250",
};

/** Dark Olive Theme - the default presentation theme */
export const darkOliveTheme: Theme = {
  name: "dark-olive",

  colors: defaultColors,
  highContrast: highContrastColors,

  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace',
    },
    scale: {
      display: "clamp(3rem, 5vw, 4.5rem)",
      h1: "clamp(2.5rem, 4vw, 3.5rem)",
      h2: "clamp(2rem, 3vw, 2.5rem)",
      h3: "clamp(1.5rem, 2.5vw, 2rem)",
      body: "clamp(1rem, 1.5vw, 1.25rem)",
      caption: "clamp(0.875rem, 1vw, 1rem)",
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    minSize: "0.875rem",
  },

  spacing: {
    slide: {
      padding: "3rem",
      gap: "1.5rem",
    },
    navigation: {
      dotSize: "0.75rem",
      dotGap: "0.5rem",
      bottomOffset: "2rem",
    },
  },

  effects: {
    gradient: {
      background: "linear-gradient(135deg, #1a1f16 0%, #252b1f 50%, #1a1f16 100%)",
      radial: "radial-gradient(ellipse at center, #252b1f 0%, #1a1f16 70%)",
      glow: "radial-gradient(ellipse at center, rgba(200, 245, 66, 0.15) 0%, transparent 70%)",
    },
    shadow: {
      accentGlow: "0 0 20px rgba(200, 245, 66, 0.3)",
      accentGlowLg: "0 0 40px rgba(200, 245, 66, 0.4)",
      accentGlowSm: "0 0 10px rgba(200, 245, 66, 0.2)",
      elevation: "0 4px 16px rgba(15, 19, 16, 0.5)",
    },
    transition: {
      default: "150ms ease-out",
      fast: "100ms ease-out",
      slow: "300ms ease-out",
    },
    emptyState: {
      pattern: "radial-gradient(circle, #3a4230 1px, transparent 1px)",
      patternSize: "20px 20px",
    },
  },
};

/**
 * Get resolved colors based on current theme mode
 */
export function getResolvedColors(
  theme: Theme,
  mode: "default" | "high-contrast"
): ThemeColors {
  return mode === "high-contrast" ? theme.highContrast : theme.colors;
}

/**
 * CSS custom properties for theme colors
 * Can be used to dynamically apply theme via CSS variables
 */
export function getThemeCssVariables(colors: ThemeColors): Record<string, string> {
  return {
    "--theme-bg-primary": colors.background.primary,
    "--theme-bg-secondary": colors.background.secondary,
    "--theme-bg-tertiary": colors.background.tertiary,
    "--theme-bg-deep": colors.background.deep,
    "--theme-accent-primary": colors.accent.primary,
    "--theme-accent-bright": colors.accent.bright,
    "--theme-accent-dim": colors.accent.dim,
    "--theme-accent-pressed": colors.accent.pressed,
    "--theme-text-primary": colors.text.primary,
    "--theme-text-secondary": colors.text.secondary,
    "--theme-text-muted": colors.text.muted,
    "--theme-text-bright": colors.text.bright,
    "--theme-border": colors.border,
  };
}
