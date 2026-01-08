/**
 * HighContrastToggle - Accessibility toggle for high contrast mode
 * Military-tech aesthetic: subtle but discoverable
 */

import type { ReactElement } from "react";
import { useTheme } from "../../hooks/useTheme.ts";

export interface HighContrastToggleProps {
  /** Optional className for positioning */
  className?: string;
}

export function HighContrastToggle({
  className = "",
}: HighContrastToggleProps): ReactElement {
  const { mode, toggleMode } = useTheme();
  const isHighContrast = mode === "high-contrast";

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    toggleMode();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group flex items-center gap-2 px-3 py-2 rounded-slide
        bg-olive-800/50 border border-olive-600
        hover:bg-olive-700/50 hover:border-olive-500
        focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 focus-visible:ring-offset-olive-900
        transition-all duration-150 ease-precise
        ${className}
      `}
      aria-label={`${isHighContrast ? "Disable" : "Enable"} high contrast mode`}
      aria-pressed={isHighContrast}
      title={`${isHighContrast ? "Disable" : "Enable"} high contrast mode`}
    >
      {/* Icon - eye with contrast indicator */}
      <svg
        className={`w-4 h-4 transition-colors duration-150 ${
          isHighContrast ? "text-lime-400" : "text-sand-500 group-hover:text-sand-400"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
        {/* High contrast indicator */}
        {isHighContrast && (
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        )}
      </svg>

      {/* Label */}
      <span
        className={`text-caption transition-colors duration-150 ${
          isHighContrast ? "text-lime-400" : "text-sand-500 group-hover:text-sand-400"
        }`}
      >
        {isHighContrast ? "High Contrast" : "Contrast"}
      </span>

      {/* Status indicator */}
      <div
        className={`
          w-1.5 h-1.5 rounded-full transition-all duration-150
          ${isHighContrast ? "bg-lime-500 shadow-lime-glow-sm" : "bg-olive-500"}
        `}
      />
    </button>
  );
}

/**
 * Compact icon-only version for tight spaces
 */
export function HighContrastToggleCompact({
  className = "",
}: HighContrastToggleProps): ReactElement {
  const { mode, toggleMode } = useTheme();
  const isHighContrast = mode === "high-contrast";

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    toggleMode();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        p-2 rounded-full
        bg-olive-800/50 border border-olive-600
        hover:bg-olive-700/50 hover:border-olive-500
        focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 focus-visible:ring-offset-olive-900
        transition-all duration-150 ease-precise
        ${isHighContrast ? "border-lime-600/50" : ""}
        ${className}
      `}
      aria-label={`${isHighContrast ? "Disable" : "Enable"} high contrast mode`}
      aria-pressed={isHighContrast}
      title={`${isHighContrast ? "Disable" : "Enable"} high contrast mode`}
    >
      <svg
        className={`w-4 h-4 transition-colors duration-150 ${
          isHighContrast ? "text-lime-400" : "text-sand-500"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </button>
  );
}
