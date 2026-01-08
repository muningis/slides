/**
 * ClosingSlide - Thank you / closing slide layout
 * Military-tech aesthetic: prominent message with lime glow accent
 */

import type { ClosingSlide as ClosingSlideType } from "../../../shared/types/presentation.ts";

export interface ClosingSlideProps {
  slide: ClosingSlideType;
}

export function ClosingSlide({ slide }: ClosingSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-lime-glow opacity-20 pointer-events-none" />

      {/* Main message */}
      <div className="relative">
        <h1 className="text-display font-bold text-sand-100 tracking-tight mb-6">
          {slide.message}
        </h1>

        {/* Lime accent underline */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-16 h-1 bg-lime-500 rounded-full shadow-lime-glow" />
          <div className="w-4 h-1 bg-lime-600 rounded-full" />
          <div className="w-2 h-1 bg-lime-700 rounded-full" />
        </div>
      </div>

      {/* Subtitle/tagline */}
      {slide.subtitle && (
        <p className="text-h3 text-sand-300 font-normal max-w-2xl">
          {slide.subtitle}
        </p>
      )}

      {/* Author attribution */}
      {slide.author && (
        <div className="mt-12 text-body text-sand-400">
          <span className="text-lime-600">—</span> {slide.author}
        </div>
      )}
    </div>
  );
}
