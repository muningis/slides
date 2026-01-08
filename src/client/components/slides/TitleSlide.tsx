/**
 * TitleSlide - Prominent title-only slide with lime accent underline
 * Military-tech aesthetic: bold, centered, commanding
 */

import type { TitleSlide as TitleSlideType } from "../../../shared/types/presentation.ts";

export interface TitleSlideProps {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: TitleSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Title with accent underline */}
      <div className="relative">
        <h1 className="text-display font-bold text-sand-100 tracking-tight">
          {slide.title}
        </h1>
        {/* Lime accent underline */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-lime-500 rounded-full shadow-lime-glow" />
      </div>
    </div>
  );
}
