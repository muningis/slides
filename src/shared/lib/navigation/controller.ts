/**
 * NavigationController - State machine for presentation navigation
 * Implements Observer pattern for React integration
 */

import type {
  NavigationState,
  NavigationObserver,
} from "../../types/navigation.ts";
import type { Slide } from "../../types/presentation.ts";
import { getSlideStepCount } from "../../types/presentation.ts";

/**
 * NavigationController manages presentation navigation state
 * - Forward: step-by-step within multi-step slides, then next slide
 * - Backward: always goes to previous slide (not step-by-step)
 */
export class NavigationController {
  private state: NavigationState;
  private slides: Slide[];
  private observers: Set<NavigationObserver> = new Set();

  constructor(slides: Slide[]) {
    this.slides = slides;
    this.state = this.createInitialState();
  }

  /**
   * Create initial navigation state
   */
  private createInitialState(): NavigationState {
    const totalSlides = this.slides.length;
    const firstSlide = this.slides[0];
    const totalSteps = firstSlide !== undefined ? getSlideStepCount(firstSlide) : 0;

    return {
      currentSlide: 0,
      currentStep: 0,
      totalSlides,
      totalSteps,
      isAtStart: true,
      isAtEnd: totalSlides === 0,
    };
  }

  /**
   * Get current navigation state
   */
  getState(): NavigationState {
    return { ...this.state };
  }

  /**
   * Get current slide
   */
  getCurrentSlide(): Slide | undefined {
    return this.slides[this.state.currentSlide];
  }

  /**
   * Navigate forward - step-by-step within slide, then next slide
   */
  forward(): void {
    if (this.state.isAtEnd) {
      return;
    }

    const currentSlide = this.slides[this.state.currentSlide];
    if (currentSlide === undefined) {
      return;
    }
    const totalSteps = getSlideStepCount(currentSlide);

    // Check if there are more steps in current slide
    if (this.state.currentStep < totalSteps - 1) {
      // Advance to next step within same slide
      this.updateState({
        currentStep: this.state.currentStep + 1,
      });
    } else if (this.state.currentSlide < this.state.totalSlides - 1) {
      // Move to next slide
      const nextSlideIndex = this.state.currentSlide + 1;
      const nextSlide = this.slides[nextSlideIndex];
      if (nextSlide === undefined) {
        return;
      }

      this.updateState({
        currentSlide: nextSlideIndex,
        currentStep: 0,
        totalSteps: getSlideStepCount(nextSlide),
      });
    }

    this.notify();
  }

  /**
   * Navigate backward - step-by-step within slide, then to last step of previous slide
   */
  backward(): void {
    if (this.state.isAtStart) {
      return;
    }

    // If we have more steps to go back within current slide
    if (this.state.currentStep > 0) {
      this.updateState({
        currentStep: this.state.currentStep - 1,
      });
      this.notify();
      return;
    }

    // Go to previous slide, landing on its last step
    const prevSlideIndex = this.state.currentSlide - 1;

    const prevSlide = this.slides[prevSlideIndex];
    if (prevSlideIndex >= 0 && prevSlide !== undefined) {
      const prevTotalSteps = getSlideStepCount(prevSlide);
      this.updateState({
        currentSlide: prevSlideIndex,
        currentStep: prevTotalSteps - 1, // Land on last step
        totalSteps: prevTotalSteps,
      });

      this.notify();
    }
  }

  /**
   * Jump to specific slide
   */
  goToSlide(slideIndex: number): void {
    if (slideIndex < 0 || slideIndex >= this.state.totalSlides) {
      return;
    }

    const slide = this.slides[slideIndex];
    if (slide === undefined) {
      return;
    }

    this.updateState({
      currentSlide: slideIndex,
      currentStep: 0,
      totalSteps: getSlideStepCount(slide),
    });

    this.notify();
  }

  /**
   * Subscribe to state changes
   * @returns Unsubscribe function
   */
  subscribe(observer: NavigationObserver): () => void {
    this.observers.add(observer);

    return () => {
      this.observers.delete(observer);
    };
  }

  /**
   * Update state with partial changes and recalculate derived values
   */
  private updateState(changes: Partial<NavigationState>): void {
    this.state = {
      ...this.state,
      ...changes,
    };

    // Recalculate derived state
    this.state.isAtStart =
      this.state.currentSlide === 0 && this.state.currentStep === 0;

    const isLastSlide = this.state.currentSlide === this.state.totalSlides - 1;
    const isLastStep = this.state.currentStep === this.state.totalSteps - 1;
    this.state.isAtEnd =
      this.state.totalSlides === 0 || (isLastSlide && isLastStep);
  }

  /**
   * Notify all subscribers of state change
   */
  private notify(): void {
    const stateCopy = this.getState();
    this.observers.forEach((observer) => observer(stateCopy));
  }
}
