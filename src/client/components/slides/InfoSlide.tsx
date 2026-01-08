/**
 * InfoSlide - Infographic-style layout for data/statistics
 * Military-tech aesthetic: clean data presentation with lime accents
 */

import { motion } from "framer-motion";
import type { InfoSlide as InfoSlideType } from "../../../shared/types/presentation.ts";
import { stepVariants, stepTransition } from "./variants.ts";

export interface InfoSlideProps {
  slide: InfoSlideType;
  currentStep: number;
}

export function InfoSlide({
  slide,
  currentStep,
}: InfoSlideProps): React.ReactElement {
  // Handle empty items
  if (slide.items.length === 0) {
    return (
      <div className="flex flex-col items-start">
        {slide.title && (
          <h1 className="text-h1 font-bold mb-6 text-sand-100">{slide.title}</h1>
        )}
        <div
          className="w-48 h-32 rounded-slide bg-dot-pattern opacity-30"
          style={{ backgroundSize: "16px 16px" }}
        />
        <p className="text-sand-500 mt-4">No items</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-5xl w-full">
      {slide.title && (
        <h1 className="text-h1 font-bold mb-12 text-sand-100">
          {slide.title}
        </h1>
      )}

      {/* Info grid - responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {slide.items.map((item, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            initial="hidden"
            animate={index <= currentStep ? "visible" : "hidden"}
            transition={stepTransition}
            className="relative group"
          >
            {/* Card container */}
            <div className="bg-olive-800/30 border border-olive-600 rounded-slide p-6 transition-all duration-200 group-hover:border-lime-600/50 backdrop-blur-sm">
              {/* Value - large accent number */}
              {item.value && (
                <div className="text-display font-bold text-lime-500 mb-2 tracking-tight">
                  {item.value}
                </div>
              )}

              {/* Label */}
              <div className="text-h3 font-semibold text-sand-100 mb-2">
                {item.label}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-body text-sand-400">{item.description}</p>
              )}

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-0.5 bg-lime-600/30 transform rotate-45 translate-y-4 -translate-x-2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
