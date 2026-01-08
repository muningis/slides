/**
 * Presentation - Main container for slide presentation
 * Handles layout, animation, and slide rendering
 */

import { AnimatePresence, motion } from "framer-motion";
import { usePresentation } from "../../hooks/usePresentation.ts";
import { NavigationControls } from "../navigation/NavigationControls.tsx";
import { SlideRenderer } from "../slides/SlideRenderer.tsx";
import {
  slideVariants,
  defaultTransition,
} from "../slides/variants.ts";
import type { Presentation as PresentationType } from "../../../shared/types/presentation.ts";

export interface PresentationProps {
  /** Validated presentation data */
  presentation: PresentationType;
}

/**
 * Main presentation component with navigation and animation
 */
export function Presentation({
  presentation,
}: PresentationProps): React.ReactElement {
  const { state, currentSlide, forward, backward } =
    usePresentation(presentation);

  // Handle empty presentation
  if (presentation.slides.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-lg opacity-50">No slides in presentation</p>
      </div>
    );
  }

  return (
    <NavigationControls state={state} onForward={forward} onBackward={backward}>
      <div className="w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {currentSlide && (
            <motion.div
              key={`slide-${state.currentSlide}`}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={defaultTransition}
              className="w-full h-full flex items-center justify-center p-8"
            >
              <SlideRenderer slide={currentSlide} currentStep={state.currentStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NavigationControls>
  );
}
