/**
 * Unit tests for NavigationController
 * Tests: T016, T017, T018, T019
 */

import { describe, expect, it } from "bun:test";
import { NavigationController } from "../../../src/shared/lib/navigation/controller.ts";
import type { Slide } from "../../../src/shared/types/presentation.ts";

describe("NavigationController", () => {
  // Sample slides for testing
  const singleStepSlides: Slide[] = [
    { type: "title", title: "Slide 1" },
    { type: "title", title: "Slide 2" },
    { type: "title", title: "Slide 3" },
  ];

  const multiStepSlides: Slide[] = [
    { type: "title", title: "Intro" },
    { type: "bullets", items: ["A", "B", "C"] }, // 3 steps
    { type: "title", title: "End" },
  ];

  // T016: Unit test for forward() transition
  describe("forward()", () => {
    it("advances to next slide on single-step slide", () => {
      const controller = new NavigationController(singleStepSlides);
      const initialState = controller.getState();

      expect(initialState.currentSlide).toBe(0);

      controller.forward();
      const newState = controller.getState();

      expect(newState.currentSlide).toBe(1);
      expect(newState.currentStep).toBe(0);
    });

    it("advances through all slides", () => {
      const controller = new NavigationController(singleStepSlides);

      controller.forward(); // Slide 0 -> 1
      controller.forward(); // Slide 1 -> 2

      const state = controller.getState();
      expect(state.currentSlide).toBe(2);
      expect(state.isAtEnd).toBe(true);
    });
  });

  // T017: Unit test for backward() transition
  describe("backward()", () => {
    it("moves to previous slide (whole slide, not step)", () => {
      const controller = new NavigationController(singleStepSlides);
      controller.forward(); // Move to slide 1
      controller.forward(); // Move to slide 2

      controller.backward();
      const state = controller.getState();

      expect(state.currentSlide).toBe(1);
    });

    it("moves to previous slide from multi-step slide mid-way", () => {
      const controller = new NavigationController(multiStepSlides);
      controller.forward(); // Move to bullets slide
      controller.forward(); // Reveal step 2
      controller.forward(); // Reveal step 3

      controller.backward();
      const state = controller.getState();

      // Should go back to previous slide, not previous step
      expect(state.currentSlide).toBe(0);
      expect(state.currentStep).toBe(0);
    });
  });

  // T018: Unit test for step-by-step forward within slide
  describe("step-by-step forward", () => {
    it("reveals steps one at a time on multi-step slide", () => {
      const controller = new NavigationController(multiStepSlides);
      controller.forward(); // Move to bullets slide

      const state1 = controller.getState();
      expect(state1.currentSlide).toBe(1);
      expect(state1.currentStep).toBe(0); // First bullet visible

      controller.forward(); // Reveal second bullet
      const state2 = controller.getState();
      expect(state2.currentSlide).toBe(1);
      expect(state2.currentStep).toBe(1);

      controller.forward(); // Reveal third bullet
      const state3 = controller.getState();
      expect(state3.currentSlide).toBe(1);
      expect(state3.currentStep).toBe(2);

      controller.forward(); // Now move to next slide
      const state4 = controller.getState();
      expect(state4.currentSlide).toBe(2);
      expect(state4.currentStep).toBe(0);
    });

    it("correctly reports total steps for current slide", () => {
      const controller = new NavigationController(multiStepSlides);

      const state1 = controller.getState();
      expect(state1.totalSteps).toBe(1); // Title slide has 1 step

      controller.forward();
      const state2 = controller.getState();
      expect(state2.totalSteps).toBe(3); // Bullets slide has 3 steps
    });
  });

  // T019: Unit test for boundary conditions (first/last slide)
  describe("boundary conditions", () => {
    it("does not go before first slide", () => {
      const controller = new NavigationController(singleStepSlides);
      const initialState = controller.getState();

      expect(initialState.isAtStart).toBe(true);

      controller.backward(); // Try to go back
      const state = controller.getState();

      expect(state.currentSlide).toBe(0);
      expect(state.isAtStart).toBe(true);
    });

    it("does not go past last slide", () => {
      const controller = new NavigationController(singleStepSlides);
      controller.forward();
      controller.forward(); // Now at last slide

      const stateAtEnd = controller.getState();
      expect(stateAtEnd.isAtEnd).toBe(true);

      controller.forward(); // Try to go forward
      const state = controller.getState();

      expect(state.currentSlide).toBe(2);
      expect(state.isAtEnd).toBe(true);
    });

    it("isAtStart is false after forward", () => {
      const controller = new NavigationController(singleStepSlides);
      controller.forward();

      expect(controller.getState().isAtStart).toBe(false);
    });

    it("isAtEnd is false before reaching end", () => {
      const controller = new NavigationController(singleStepSlides);
      controller.forward();

      expect(controller.getState().isAtEnd).toBe(false);
    });

    it("handles empty presentation", () => {
      const controller = new NavigationController([]);
      const state = controller.getState();

      expect(state.totalSlides).toBe(0);
      expect(state.isAtStart).toBe(true);
      expect(state.isAtEnd).toBe(true);
    });
  });

  describe("observer pattern", () => {
    it("notifies subscribers on state change", () => {
      const controller = new NavigationController(singleStepSlides);
      let notifiedState = controller.getState();

      controller.subscribe((state) => {
        notifiedState = state;
      });

      controller.forward();

      expect(notifiedState.currentSlide).toBe(1);
    });

    it("allows unsubscribing", () => {
      const controller = new NavigationController(singleStepSlides);
      let callCount = 0;

      const unsubscribe = controller.subscribe(() => {
        callCount++;
      });

      controller.forward();
      expect(callCount).toBe(1);

      unsubscribe();
      controller.forward();
      expect(callCount).toBe(1); // Should not increase
    });

    it("supports multiple subscribers", () => {
      const controller = new NavigationController(singleStepSlides);
      let count1 = 0;
      let count2 = 0;

      controller.subscribe(() => count1++);
      controller.subscribe(() => count2++);

      controller.forward();

      expect(count1).toBe(1);
      expect(count2).toBe(1);
    });
  });
});
