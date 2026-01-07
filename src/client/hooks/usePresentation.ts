/**
 * usePresentation - React hook for presentation navigation
 * Wraps NavigationController for React integration
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { NavigationController } from "../../shared/lib/navigation/controller.ts";
import type { NavigationState } from "../../shared/types/navigation.ts";
import type { Slide, Presentation } from "../../shared/types/presentation.ts";

export interface UsePresentationResult {
  /** Current navigation state */
  state: NavigationState;
  /** Current slide data */
  currentSlide: Slide | undefined;
  /** Navigate forward (step or slide) */
  forward: () => void;
  /** Navigate backward (whole slide) */
  backward: () => void;
  /** Jump to specific slide */
  goToSlide: (index: number) => void;
}

/**
 * Hook for managing presentation navigation state
 * @param presentation - Validated presentation data
 */
export function usePresentation(
  presentation: Presentation
): UsePresentationResult {
  // Create controller once per presentation
  const controller = useMemo(
    () => new NavigationController(presentation.slides),
    [presentation]
  );

  const [state, setState] = useState<NavigationState>(() =>
    controller.getState()
  );

  // Subscribe to controller state changes
  useEffect(() => {
    const unsubscribe = controller.subscribe(setState);
    return unsubscribe;
  }, [controller]);

  // Memoized navigation functions
  const forward = useCallback(() => {
    controller.forward();
  }, [controller]);

  const backward = useCallback(() => {
    controller.backward();
  }, [controller]);

  const goToSlide = useCallback(
    (index: number) => {
      controller.goToSlide(index);
    },
    [controller]
  );

  const currentSlide = controller.getCurrentSlide();

  return {
    state,
    currentSlide,
    forward,
    backward,
    goToSlide,
  };
}
