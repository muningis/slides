/**
 * TimelineSlide - Alternating left-right timeline with step-by-step reveal
 * Military-tech aesthetic: lime accent line and dots, zigzag layout
 */

import { motion } from "framer-motion";
import type { TimelineSlide as TimelineSlideType } from "../../../shared/types/presentation.ts";
import { stepVariants, stepTransition } from "./variants.ts";

export interface TimelineSlideProps {
  slide: TimelineSlideType;
  currentStep: number;
}

export function TimelineSlide({
  slide,
  currentStep,
}: TimelineSlideProps): React.ReactElement {
  // Handle empty events
  if (slide.events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {slide.title && (
          <h1 className="text-h1 font-bold mb-6 text-sand-100">{slide.title}</h1>
        )}
        {/* Empty state */}
        <div
          className="w-48 h-32 rounded-slide bg-dot-pattern opacity-30"
          style={{ backgroundSize: "16px 16px" }}
        />
        <p className="text-sand-500 mt-4">No events</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto">
      {/* Title - centered at top */}
      {slide.title && (
        <h1 className="text-h1 font-bold text-sand-100 text-center mb-8 flex-shrink-0">
          {slide.title}
        </h1>
      )}

      {/* Timeline container - fills remaining height */}
      <div className="relative flex-1 flex items-center">
        {/* Central vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-olive-600 transform -translate-x-1/2" />

        {/* Timeline events - distributed vertically */}
        <div className="relative w-full h-full flex flex-col justify-around py-4">
          {slide.events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={stepVariants}
                initial="hidden"
                animate={index <= currentStep ? "visible" : "hidden"}
                transition={stepTransition}
                className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
              >
                {/* Event content - left side */}
                {isLeft && (
                  <div className="w-[calc(50%-2rem)] pr-8 text-right">
                    {event.date && (
                      <div className="text-caption text-lime-600 mb-1 font-mono">
                        {event.date}
                      </div>
                    )}
                    <h3 className="text-h3 font-semibold text-sand-100">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-body text-sand-400 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                )}

                {/* Timeline dot - centered */}
                <div
                  className={`
                    absolute left-1/2 transform -translate-x-1/2
                    w-4 h-4 rounded-full border-2 transition-colors duration-200 z-10
                    ${
                      index <= currentStep
                        ? "bg-lime-500 border-lime-400 shadow-lime-glow-sm"
                        : "bg-olive-800 border-olive-600"
                    }
                  `}
                />

                {/* Event content - right side */}
                {!isLeft && (
                  <div className="w-[calc(50%-2rem)] pl-8 text-left">
                    {event.date && (
                      <div className="text-caption text-lime-600 mb-1 font-mono">
                        {event.date}
                      </div>
                    )}
                    <h3 className="text-h3 font-semibold text-sand-100">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-body text-sand-400 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
