/**
 * NavigationDots - Themed slide navigation indicators
 * Military-tech aesthetic: precise dots with lime accent highlighting
 */

import type { ReactElement } from "react";

export interface NavigationDotsProps {
  /** Total number of slides */
  total: number;
  /** Current slide index (0-based) */
  current: number;
  /** Optional click handler to navigate */
  onNavigate?: (index: number) => void;
  /** Optional className for container */
  className?: string;
}

export function NavigationDots({
  total,
  current,
  onNavigate,
  className = "",
}: NavigationDotsProps): ReactElement {
  // Don't render if only one slide
  if (total <= 1) {
    return <></>;
  }

  return (
    <nav
      className={`flex items-center justify-center gap-2 ${className}`}
      role="navigation"
      aria-label="Slide navigation"
    >
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        const isPast = index < current;

        return (
          <button
            key={index}
            onClick={() => onNavigate?.(index)}
            disabled={!onNavigate}
            className={`
              relative w-3 h-3 rounded-full transition-all duration-200 ease-precise
              focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 focus-visible:ring-offset-olive-900
              ${onNavigate ? "cursor-pointer" : "cursor-default"}
              ${
                isActive
                  ? "bg-lime-500 scale-125 shadow-lime-glow"
                  : isPast
                    ? "bg-lime-600/50 hover:bg-lime-600/70"
                    : "bg-olive-600 hover:bg-olive-500"
              }
            `}
            aria-label={`Go to slide ${index + 1}${isActive ? " (current)" : ""}`}
            aria-current={isActive ? "step" : undefined}
          >
            {/* Active dot pulse effect */}
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-lime-500 animate-lime-pulse opacity-50" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/**
 * Compact navigation with slide counter
 */
export interface NavigationCounterProps {
  total: number;
  current: number;
  className?: string;
}

export function NavigationCounter({
  total,
  current,
  className = "",
}: NavigationCounterProps): ReactElement {
  return (
    <div
      className={`flex items-center gap-1.5 text-caption font-mono ${className}`}
      aria-label={`Slide ${current + 1} of ${total}`}
    >
      <span className="text-lime-500 font-medium">{current + 1}</span>
      <span className="text-olive-500">/</span>
      <span className="text-sand-500">{total}</span>
    </div>
  );
}
