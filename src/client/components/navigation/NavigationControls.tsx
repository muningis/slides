/**
 * NavigationControls - Keyboard and click navigation for presentations
 * Handles arrow keys, space, and provides visual navigation hints
 */

import { useEffect, useCallback, useRef } from "react";
import type { NavigationState } from "../../../shared/types/navigation.ts";

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
  const navigate = useCallback(
    (action: () => void): void => {
      const now = Date.now();
      if (now - lastNavigationRef.current < NAVIGATION_DEBOUNCE_MS) {
        return;
      }
      lastNavigationRef.current = now;
      action();
    },
    []
  );

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
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
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

      {/* Navigation indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm opacity-50">
        {state.totalSlides > 0 && (
          <span>
            {state.currentSlide + 1} / {state.totalSlides}
            {state.totalSteps > 1 && (
              <span className="ml-2">
                (step {state.currentStep + 1}/{state.totalSteps})
              </span>
            )}
          </span>
        )}
      </div>

      {/* Visual hints for navigation boundaries */}
      {state.isAtStart && (
        <div className="absolute top-4 left-4 text-xs opacity-30">Start</div>
      )}
      {state.isAtEnd && (
        <div className="absolute top-4 right-4 text-xs opacity-30">End</div>
      )}
    </div>
  );
}
