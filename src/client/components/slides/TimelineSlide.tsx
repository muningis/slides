/**
 * TimelineSlide - Vertical timeline with step-by-step reveal
 */

import { motion } from "framer-motion";
import type { TimelineSlide as TimelineSlideType } from "../../../shared/types/presentation.ts";
import { stepVariants, timelineLineVariants, stepTransition } from "./variants.ts";

export interface TimelineSlideProps {
  slide: TimelineSlideType;
  currentStep: number;
}

export function TimelineSlide({
  slide,
  currentStep,
}: TimelineSlideProps): React.ReactElement {
  // Handle empty events or single event
  if (slide.events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        {slide.title && (
          <h1 className="text-3xl font-bold mb-6">{slide.title}</h1>
        )}
        <p className="opacity-50">No events</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-w-3xl w-full">
      {slide.title && (
        <h1 className="text-3xl font-bold mb-8">{slide.title}</h1>
      )}

      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300" />

        {/* Timeline events */}
        <div className="space-y-8">
          {slide.events.map((event, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              animate={index <= currentStep ? "visible" : "hidden"}
              transition={stepTransition}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white transform -translate-x-1/2" />

              {/* Connecting line animation */}
              {index < slide.events.length - 1 && index < currentStep && (
                <motion.div
                  variants={timelineLineVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className="absolute -left-8 top-5 w-0.5 h-8 bg-blue-500 transform -translate-x-1/2"
                />
              )}

              {/* Event content */}
              <div className="ml-4">
                {event.date && (
                  <div className="text-sm text-gray-500 mb-1">{event.date}</div>
                )}
                <h3 className="text-xl font-semibold">{event.title}</h3>
                {event.description && (
                  <p className="text-gray-600 mt-1">{event.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
