/**
 * NavigationControls - Keyboard and click navigation for presentations
 * Military-tech aesthetic: clean, minimal indicators with lime accents
 */

import { useEffect, useCallback, useRef } from "react";
import type { NavigationState } from "../../../shared/types/navigation.ts";
import { HighContrastToggleCompact } from "../theme/HighContrastToggle.tsx";

/** Debounce delay in milliseconds for rapid navigation */
const NAVIGATION_DEBOUNCE_MS = 100;

export interface NavigationControlsProps {
  /** Current navigation state */
  state: NavigationState;
  /** Navigate forward */
  onForward: () => void;
  /** Navigate backward */
  onBackward: () => void;
  /** Children to render */
  children: React.ReactNode;
}

/**
 * Wrapper component that handles keyboard navigation
 */
export function NavigationControls({
  state,
  onForward,
  onBackward,
  children,
}: NavigationControlsProps): React.ReactElement {
  // Track last navigation time for debouncing
  const lastNavigationRef = useRef<number>(0);

  // Debounced navigation helper
  const navigate = useCallback((action: () => void): void => {
    const now = Date.now();
    if (now - lastNavigationRef.current < NAVIGATION_DEBOUNCE_MS) {
      return;
    }
    lastNavigationRef.current = now;
    action();
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case " ": // Space
        case "Enter":
          event.preventDefault();
          navigate(onForward);
          break;
        case "ArrowLeft":
        case "Backspace":
          event.preventDefault();
          navigate(onBackward);
          break;
      }
    },
    [navigate, onForward, onBackward]
  );

  // Attach keyboard listeners
  useEffect((): (() => void) => {
    window.addEventListener("keydown", handleKeyDown);
    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Click to advance (debounced)
  const handleClick = useCallback((): void => {
    navigate(onForward);
  }, [navigate, onForward]);

  return (
    <div
      className="relative w-full h-full"
      onClick={handleClick}
      role="presentation"
      tabIndex={0}
    >
      {children}

      {/* Bottom navigation bar */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between pointer-events-none">
        {/* Left: Slide number only */}
        <div className="text-caption text-sand-500 font-mono">
          {state.currentSlide + 1}
        </div>

        {/* Right: High contrast toggle */}
        <div className="pointer-events-auto">
          <HighContrastToggleCompact />
        </div>
      </div>

      {/* Boundary indicators */}
      {state.isAtStart && (
        <div className="absolute top-4 left-4 px-2 py-1 rounded bg-olive-800/50 text-caption text-sand-500">
          Start
        </div>
      )}
      {state.isAtEnd && (
        <div className="absolute top-4 right-4 px-2 py-1 rounded bg-olive-800/50 text-caption text-lime-600">
          End
        </div>
      )}
    </div>
  );
}
