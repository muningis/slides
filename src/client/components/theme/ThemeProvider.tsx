/**
 * Theme Provider - React context for theme state management
 * Provides theme colors, mode toggle, and localStorage persistence
 */

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
  type ReactElement,
} from "react";
import type { Theme, ThemeMode, ThemeColors, ThemeState } from "../../../shared/types/theme.ts";
import { darkOliveTheme, getResolvedColors, getThemeCssVariables } from "../../lib/theme.ts";

/** Storage key for theme mode persistence */
const THEME_MODE_STORAGE_KEY = "slides-theme-mode";

/** Theme context - null when outside provider */
export const ThemeContext = createContext<ThemeState | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  /** Override default theme */
  theme?: Theme;
  /** Override initial mode */
  initialMode?: ThemeMode;
}

/**
 * Get initial theme mode from localStorage or default
 */
function getInitialMode(initialMode?: ThemeMode): ThemeMode {
  if (initialMode) {
    return initialMode;
  }

  if (typeof window === "undefined") {
    return "default";
  }

  const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
  if (stored === "default" || stored === "high-contrast") {
    return stored;
  }

  return "default";
}

/**
 * Apply CSS custom properties to document root
 */
function applyCssVariables(colors: ThemeColors): void {
  if (typeof document === "undefined") {
    return;
  }

  const variables = getThemeCssVariables(colors);
  const root = document.documentElement;

  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value);
  }
}

export function ThemeProvider({
  children,
  theme = darkOliveTheme,
  initialMode,
}: ThemeProviderProps): ReactElement {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode(initialMode));

  // Resolve colors based on current mode
  const colors = useMemo(
    () => getResolvedColors(theme, mode),
    [theme, mode]
  );

  // Apply CSS variables when colors change
  useEffect(() => {
    applyCssVariables(colors);
  }, [colors]);

  // Apply data attribute for CSS targeting
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.setAttribute("data-theme-mode", mode);
  }, [mode]);

  // Persist mode to localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(THEME_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setModeState((current) =>
      current === "default" ? "high-contrast" : "default"
    );
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const contextValue = useMemo<ThemeState>(
    () => ({
      theme,
      mode,
      colors,
      toggleMode,
      setMode,
    }),
    [theme, mode, colors, toggleMode, setMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
