/**
 * Valibot schemas for theme configuration validation
 */

import * as v from "valibot";

/** Hex color validation - must be 6-digit hex with # */
const HexColorSchema = v.pipe(
  v.string(),
  v.regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid 6-digit hex color (e.g., #1a1f16)")
);

/** CSS value validation - non-empty string */
const CssValueSchema = v.pipe(
  v.string(),
  v.minLength(1, "CSS value cannot be empty")
);

/** Schema for background colors */
export const BackgroundColorsSchema = v.object({
  primary: HexColorSchema,
  secondary: HexColorSchema,
  tertiary: HexColorSchema,
  deep: HexColorSchema,
});

/** Schema for accent colors */
export const AccentColorsSchema = v.object({
  primary: HexColorSchema,
  bright: HexColorSchema,
  dim: HexColorSchema,
  pressed: HexColorSchema,
});

/** Schema for text colors */
export const TextColorsSchema = v.object({
  primary: HexColorSchema,
  secondary: HexColorSchema,
  muted: HexColorSchema,
  bright: HexColorSchema,
});

/** Schema for complete color palette */
export const ThemeColorsSchema = v.object({
  background: BackgroundColorsSchema,
  accent: AccentColorsSchema,
  text: TextColorsSchema,
  border: HexColorSchema,
});

/** Schema for font family configuration */
export const FontFamilySchema = v.object({
  sans: CssValueSchema,
  mono: CssValueSchema,
});

/** Schema for type scale */
export const TypeScaleSchema = v.object({
  display: CssValueSchema,
  h1: CssValueSchema,
  h2: CssValueSchema,
  h3: CssValueSchema,
  body: CssValueSchema,
  caption: CssValueSchema,
});

/** Schema for font weights */
export const FontWeightSchema = v.object({
  normal: v.pipe(v.number(), v.minValue(100), v.maxValue(900)),
  medium: v.pipe(v.number(), v.minValue(100), v.maxValue(900)),
  semibold: v.pipe(v.number(), v.minValue(100), v.maxValue(900)),
  bold: v.pipe(v.number(), v.minValue(100), v.maxValue(900)),
});

/** Schema for typography configuration */
export const ThemeTypographySchema = v.object({
  fontFamily: FontFamilySchema,
  scale: TypeScaleSchema,
  weight: FontWeightSchema,
  minSize: CssValueSchema,
});

/** Schema for slide spacing */
export const SlideSpacingSchema = v.object({
  padding: CssValueSchema,
  gap: CssValueSchema,
});

/** Schema for navigation spacing */
export const NavigationSpacingSchema = v.object({
  dotSize: CssValueSchema,
  dotGap: CssValueSchema,
  bottomOffset: CssValueSchema,
});

/** Schema for spacing configuration */
export const ThemeSpacingSchema = v.object({
  slide: SlideSpacingSchema,
  navigation: NavigationSpacingSchema,
});

/** Schema for gradient effects */
export const GradientEffectsSchema = v.object({
  background: CssValueSchema,
  radial: CssValueSchema,
  glow: CssValueSchema,
});

/** Schema for shadow effects */
export const ShadowEffectsSchema = v.object({
  accentGlow: CssValueSchema,
  accentGlowLg: CssValueSchema,
  accentGlowSm: CssValueSchema,
  elevation: CssValueSchema,
});

/** Schema for transition effects */
export const TransitionEffectsSchema = v.object({
  default: CssValueSchema,
  fast: CssValueSchema,
  slow: CssValueSchema,
});

/** Schema for empty state effects */
export const EmptyStateEffectsSchema = v.object({
  pattern: CssValueSchema,
  patternSize: CssValueSchema,
});

/** Schema for visual effects configuration */
export const ThemeEffectsSchema = v.object({
  gradient: GradientEffectsSchema,
  shadow: ShadowEffectsSchema,
  transition: TransitionEffectsSchema,
  emptyState: EmptyStateEffectsSchema,
});

/** Schema for complete theme configuration */
export const ThemeSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, "Theme name cannot be empty"),
    v.regex(/^[a-z][a-z0-9-]*$/, "Theme name must be lowercase with hyphens")
  ),
  colors: ThemeColorsSchema,
  highContrast: ThemeColorsSchema,
  typography: ThemeTypographySchema,
  spacing: ThemeSpacingSchema,
  effects: ThemeEffectsSchema,
});

/** Schema for theme mode */
export const ThemeModeSchema = v.picklist(["default", "high-contrast"]);

/** Inferred types from schemas */
export type ValidatedTheme = v.InferOutput<typeof ThemeSchema>;
export type ValidatedThemeColors = v.InferOutput<typeof ThemeColorsSchema>;
export type ValidatedThemeMode = v.InferOutput<typeof ThemeModeSchema>;

/** Validation result type */
export type ThemeValidationResult =
  | { success: true; data: ValidatedTheme }
  | { success: false; errors: string[] };

/**
 * Validate a theme configuration
 * @param data - Raw theme data to validate
 * @returns Validation result with typed data or error messages
 */
export function validateTheme(data: unknown): ThemeValidationResult {
  const result = v.safeParse(ThemeSchema, data);

  if (result.success) {
    return {
      success: true,
      data: result.output,
    };
  }

  const errors = result.issues.map((issue) => {
    const path = issue.path?.map((p) => p.key).join(".") || "root";
    return `${path}: ${issue.message}`;
  });

  return {
    success: false,
    errors,
  };
}
