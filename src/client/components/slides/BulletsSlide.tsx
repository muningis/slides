/**
 * BulletsSlide - Bullet points with step-by-step reveal
 * Military-tech aesthetic: lime accent bullets, clean typography
 */

import { motion } from "framer-motion";
import type { BulletsSlide as BulletsSlideType } from "../../../shared/types/presentation.ts";
import { stepVariants, stepTransition } from "./variants.ts";

export interface BulletsSlideProps {
  slide: BulletsSlideType;
  currentStep: number;
}

export function BulletsSlide({
  slide,
  currentStep,
}: BulletsSlideProps): React.ReactElement {
  // Handle empty bullet list
  if (slide.items.length === 0) {
    return (
      <div className="flex flex-col items-start">
        {slide.title && (
          <h1 className="text-h1 font-bold mb-6 text-sand-100">{slide.title}</h1>
        )}
        {/* Empty state with dot pattern */}
        <div
          className="w-48 h-32 rounded-slide bg-dot-pattern opacity-30"
          style={{ backgroundSize: "16px 16px" }}
        />
        <p className="text-sand-500 mt-4">No items</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-3xl w-full">
      {slide.title && (
        <h1 className="text-h1 font-bold mb-10 text-sand-100">{slide.title}</h1>
      )}

      <ul className="space-y-6 w-full">
        {slide.items.map((item, index) => (
          <motion.li
            key={index}
            variants={stepVariants}
            initial="hidden"
            animate={index <= currentStep ? "visible" : "hidden"}
            transition={stepTransition}
            className="flex items-start gap-4 text-body"
          >
            {/* Lime accent bullet */}
            <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-lime-500 shadow-lime-glow-sm" />
            <span className="text-sand-200">{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
