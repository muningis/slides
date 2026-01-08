/**
 * Presentation - Main container for slide presentation
 * Military-tech aesthetic: dark olive with lime accents
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
        {/* Empty state with dot pattern */}
        <div className="text-center">
          <div
            className="w-64 h-40 mx-auto mb-6 rounded-slide bg-dot-pattern opacity-30"
            style={{ backgroundSize: "20px 20px" }}
          />
          <p className="text-body text-sand-500">No slides in presentation</p>
        </div>
      </div>
    );
  }

  // Centered slides: title, title-subtitle, closing, timeline
  const isCenteredSlide =
    currentSlide?.type === "title" ||
    currentSlide?.type === "title-subtitle" ||
    currentSlide?.type === "closing" ||
    currentSlide?.type === "timeline";

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
              className={`w-full h-full flex p-slide pt-20 pb-24 ${
                isCenteredSlide
                  ? "items-center justify-center"
                  : "items-start justify-start"
              }`}
            >
              <SlideRenderer slide={currentSlide} currentStep={state.currentStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NavigationControls>
  );
}
