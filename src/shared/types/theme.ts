/**
 * Theme type definitions for the slides presentation app
 * Military-tech minimalism: precise, commanding, energetic
 */

/** Color palette structure */
export interface ThemeColors {
  /** Background colors - deep olive tones */
  background: {
    /** Primary slide background (#1a1f16) */
    primary: string;
    /** Secondary/elevated surfaces (#252b1f) */
    secondary: string;
    /** Tertiary/hover states (#2f3628) */
    tertiary: string;
    /** Deepest shadow (#0f1310) */
    deep: string;
  };
  /** Accent colors - lime/neon green */
  accent: {
    /** Primary accent (#c8f542) */
    primary: string;
    /** High contrast variant (#d4ff4a) */
    bright: string;
    /** Dimmed/secondary (#a8d435) */
    dim: string;
    /** Pressed states (#8ab82a) */
    pressed: string;
  };
  /** Text colors - warm sand tones */
  text: {
    /** Primary text (#f5f5f0) */
    primary: string;
    /** Secondary text (#b8b8b0) */
    secondary: string;
    /** Muted text (#787870) */
    muted: string;
    /** High contrast white (#ffffff) */
    bright: string;
  };
  /** Border color (#3a4230) */
  border: string;
}

/** Typography configuration */
export interface ThemeTypography {
  /** Font family stacks */
  fontFamily: {
    /** Sans-serif for body text */
    sans: string;
    /** Monospace for code */
    mono: string;
  };
  /** Type scale - fluid sizing with clamp() */
  scale: {
    /** Display: 48-72px */
    display: string;
    /** H1: 40-56px */
    h1: string;
    /** H2: 32-40px */
    h2: string;
    /** H3: 24-32px */
    h3: string;
    /** Body: 16-20px */
    body: string;
    /** Caption: 14-16px */
    caption: string;
  };
  /** Font weights */
  weight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  /** Minimum font size for accessibility (14px) */
  minSize: string;
}

/** Spacing configuration */
export interface ThemeSpacing {
  /** Slide layout spacing */
  slide: {
    /** Content padding */
    padding: string;
    /** Gap between elements */
    gap: string;
  };
  /** Navigation indicator spacing */
  navigation: {
    /** Dot diameter */
    dotSize: string;
    /** Gap between dots */
    dotGap: string;
    /** Distance from bottom */
    bottomOffset: string;
  };
}

/** Visual effects configuration */
export interface ThemeEffects {
  /** Gradient backgrounds */
  gradient: {
    /** Main background gradient */
    background: string;
    /** Radial background variant */
    radial: string;
    /** Accent glow effect */
    glow: string;
  };
  /** Shadow definitions */
  shadow: {
    /** Lime glow for active elements */
    accentGlow: string;
    /** Large glow variant */
    accentGlowLg: string;
    /** Small glow variant */
    accentGlowSm: string;
    /** Subtle elevation shadow */
    elevation: string;
  };
  /** Transition timing */
  transition: {
    /** Default transition */
    default: string;
    /** Fast transition */
    fast: string;
    /** Slow transition */
    slow: string;
  };
  /** Empty state pattern */
  emptyState: {
    /** Dot pattern background */
    pattern: string;
    /** Pattern size */
    patternSize: string;
  };
}

/** Complete theme configuration */
export interface Theme {
  /** Theme identifier */
  name: string;
  /** Color palette */
  colors: ThemeColors;
  /** High contrast color overrides */
  highContrast: ThemeColors;
  /** Typography settings */
  typography: ThemeTypography;
  /** Spacing values */
  spacing: ThemeSpacing;
  /** Visual effects */
  effects: ThemeEffects;
}

/** Theme mode - default or high contrast */
export type ThemeMode = "default" | "high-contrast";

/** Theme context state */
export interface ThemeState {
  /** Current theme configuration */
  theme: Theme;
  /** Current mode */
  mode: ThemeMode;
  /** Resolved colors based on current mode */
  colors: ThemeColors;
  /** Toggle between modes */
  toggleMode: () => void;
  /** Set specific mode */
  setMode: (mode: ThemeMode) => void;
}
