/**
 * TypeScript types for navigation state management
 */

/** Navigation state representing current position in presentation */
export interface NavigationState {
  /** Current slide index (0-based) */
  currentSlide: number;
  /** Current step within the slide (0-based) */
  currentStep: number;
  /** Total number of slides */
  totalSlides: number;
  /** Total steps in current slide */
  totalSteps: number;
  /** Whether at the beginning of the presentation */
  isAtStart: boolean;
  /** Whether at the end of the presentation (last step of last slide) */
  isAtEnd: boolean;
}

/** Observer callback type for state changes */
export type NavigationObserver = (state: NavigationState) => void;

/** Navigation action types */
export type NavigationAction = "forward" | "backward";
