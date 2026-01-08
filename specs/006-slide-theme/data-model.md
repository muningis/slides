# Data Model: Slide Theme

**Date**: 2026-01-08
**Feature**: 006-slide-theme

## Overview

The theme system introduces configuration entities that define the visual appearance of slides. These are code-level constructs (not persisted data) that provide type-safe theme configuration.

## Entities

### Theme

The root configuration object containing all theme settings.

```typescript
interface Theme {
  name: string;                    // Theme identifier (e.g., "dark-olive")
  colors: ThemeColors;             // Color palette configuration
  typography: ThemeTypography;     // Font and text settings
  spacing: ThemeSpacing;           // Layout spacing values
  effects: ThemeEffects;           // Visual effects (gradients, glows)
  highContrast: ThemeColors;       // High-contrast color overrides
}
```

**Validation Rules:**
- `name` must be non-empty string, lowercase with hyphens
- All nested objects must be fully specified (no partial themes)

### ThemeColors

Color palette for the theme.

```typescript
interface ThemeColors {
  background: {
    primary: string;     // Main slide background (#1a1f16)
    secondary: string;   // Card/container background (#252b1f)
    tertiary: string;    // Elevated elements (#2f3628)
  };
  accent: {
    primary: string;     // Main accent color (#c8f542)
    secondary: string;   // Dimmed accent (#a8d435)
  };
  text: {
    primary: string;     // Headings, main text (#f5f5f0)
    secondary: string;   // Body text (#b8b8b0)
    muted: string;       // Captions (#787870)
  };
  border: string;        // Border/divider color (#3a4230)
}
```

**Validation Rules:**
- All color values must be valid hex colors (6-digit with #)
- Contrast ratios must meet WCAG AA (4.5:1 for text on background)

### ThemeTypography

Typography configuration.

```typescript
interface ThemeTypography {
  fontFamily: {
    sans: string;        // System font stack for text
    mono: string;        // Monospace font stack for code
  };
  scale: {
    display: string;     // Largest headings (clamp value)
    h1: string;          // Primary headings
    h2: string;          // Secondary headings
    h3: string;          // Tertiary headings
    body: string;        // Body text
    caption: string;     // Small text, captions
  };
  weight: {
    normal: number;      // 400
    medium: number;      // 500
    semibold: number;    // 600
    bold: number;        // 700
  };
  minSize: string;       // Minimum font size (14px / 0.875rem)
}
```

**Validation Rules:**
- Font family strings must be non-empty
- Scale values must be valid CSS font-size values (clamp, rem, px)
- Weight values must be 100-900 in increments of 100
- minSize must be >= 14px equivalent

### ThemeSpacing

Spacing and layout configuration.

```typescript
interface ThemeSpacing {
  slide: {
    padding: string;     // Slide content padding
    gap: string;         // Gap between elements
  };
  navigation: {
    dotSize: string;     // Navigation dot diameter
    dotGap: string;      // Gap between dots
    bottomOffset: string; // Distance from bottom
  };
}
```

**Validation Rules:**
- All values must be valid CSS length values
- Navigation dotSize must be >= 8px for touch targets

### ThemeEffects

Visual effects configuration.

```typescript
interface ThemeEffects {
  gradient: {
    background: string;  // Background gradient CSS
  };
  glow: {
    accent: string;      // Accent glow box-shadow
  };
  transition: {
    default: string;     // Default transition timing
  };
  emptyState: {
    pattern: string;     // CSS background for empty slides
  };
}
```

**Validation Rules:**
- CSS values must be syntactically valid

### ThemeMode

Theme mode state for high-contrast toggle.

```typescript
type ThemeMode = 'default' | 'high-contrast';

interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
  resolvedColors: ThemeColors; // Current colors based on mode
}
```

**State Transitions:**
- `default` ↔ `high-contrast`: User toggle action
- Persisted in localStorage as `theme-mode`

## Relationships

```
Theme (1) ────────── (1) ThemeColors (default)
  │
  └──────────────── (1) ThemeColors (highContrast)
  │
  └──────────────── (1) ThemeTypography
  │
  └──────────────── (1) ThemeSpacing
  │
  └──────────────── (1) ThemeEffects

ThemeState (1) ──── (1) Theme
             └───── (1) ThemeMode
             └───── (1) ThemeColors (resolved)
```

## Default Theme Values

```typescript
const darkOliveTheme: Theme = {
  name: 'dark-olive',
  colors: {
    background: {
      primary: '#1a1f16',
      secondary: '#252b1f',
      tertiary: '#2f3628',
    },
    accent: {
      primary: '#c8f542',
      secondary: '#a8d435',
    },
    text: {
      primary: '#f5f5f0',
      secondary: '#b8b8b0',
      muted: '#787870',
    },
    border: '#3a4230',
  },
  highContrast: {
    background: {
      primary: '#121510',
      secondary: '#1a1f16',
      tertiary: '#252b1f',
    },
    accent: {
      primary: '#d4ff4a',
      secondary: '#c8f542',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      muted: '#a0a0a0',
    },
    border: '#5a6250',
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace',
    },
    scale: {
      display: 'clamp(3rem, 5vw, 4.5rem)',
      h1: 'clamp(2.5rem, 4vw, 3.5rem)',
      h2: 'clamp(2rem, 3vw, 2.5rem)',
      h3: 'clamp(1.5rem, 2.5vw, 2rem)',
      body: 'clamp(1rem, 1.5vw, 1.25rem)',
      caption: 'clamp(0.875rem, 1vw, 1rem)',
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    minSize: '0.875rem',
  },
  spacing: {
    slide: {
      padding: '3rem',
      gap: '1.5rem',
    },
    navigation: {
      dotSize: '0.75rem',
      dotGap: '0.5rem',
      bottomOffset: '2rem',
    },
  },
  effects: {
    gradient: {
      background: 'linear-gradient(135deg, #1a1f16 0%, #252b1f 100%)',
    },
    glow: {
      accent: '0 0 20px rgba(200, 245, 66, 0.3)',
    },
    transition: {
      default: '150ms ease-in-out',
    },
    emptyState: {
      pattern: 'radial-gradient(circle, #3a4230 1px, transparent 1px)',
    },
  },
};
```

## Integration with Existing Types

The theme system integrates with existing slide types without modifying them:

```typescript
// Existing (unchanged)
type Slide = TitleSlide | TitleSubtitleSlide | TextSlide | BulletsSlide | CodeSlide | TimelineSlide;

// New: Theme context wraps presentation
interface ThemedPresentation {
  presentation: Presentation;
  theme: Theme;
  mode: ThemeMode;
}
```

Slide components receive theme through React context, not props modification.
