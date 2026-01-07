/**
 * BulletsSlide - Bullet points with step-by-step reveal
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
      <div className="flex flex-col items-center justify-center">
        {slide.title && (
          <h1 className="text-3xl font-bold mb-6">{slide.title}</h1>
        )}
        <p className="opacity-50">No items</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-3xl w-full">
      {slide.title && (
        <h1 className="text-3xl font-bold mb-8">{slide.title}</h1>
      )}
      <ul className="space-y-4 w-full">
        {slide.items.map((item, index) => (
          <motion.li
            key={index}
            variants={stepVariants}
            initial="hidden"
            animate={index <= currentStep ? "visible" : "hidden"}
            transition={stepTransition}
            className="flex items-start gap-3 text-xl"
          >
            <span className="text-2xl">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
