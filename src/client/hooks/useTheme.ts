/**
 * useTheme hook - Access theme context with type safety
 */

import { useContext } from "react";
import { ThemeContext } from "../components/theme/ThemeProvider.tsx";
import type { ThemeState, ThemeColors, ThemeMode } from "../../shared/types/theme.ts";

/**
 * Hook to access the current theme state
 * Must be used within a ThemeProvider
 *
 * @returns Theme state including colors, mode, and toggle function
 * @throws Error if used outside ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, mode, toggleMode } = useTheme();
 *
 *   return (
 *     <div style={{ backgroundColor: colors.background.primary }}>
 *       <button onClick={toggleMode}>
 *         Current mode: {mode}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeState {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. " +
        "Wrap your app with <ThemeProvider> to use this hook."
    );
  }

  return context;
}

/**
 * Hook to access only theme colors (convenience wrapper)
 */
export function useThemeColors(): ThemeColors {
  const { colors } = useTheme();
  return colors;
}

/**
 * Hook to access theme mode and toggle (convenience wrapper)
 */
export function useThemeMode(): {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
} {
  const { mode, toggleMode, setMode } = useTheme();
  return { mode, toggleMode, setMode };
}
