/**
 * TitleSubtitleSlide - Title with subtitle, hierarchical typography
 * Military-tech aesthetic: clear hierarchy, precise spacing
 */

import type { TitleSubtitleSlide as TitleSubtitleSlideType } from "../../../shared/types/presentation.ts";

export interface TitleSubtitleSlideProps {
  slide: TitleSubtitleSlideType;
}

export function TitleSubtitleSlide({
  slide,
}: TitleSubtitleSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      {/* Main title */}
      <h1 className="text-display font-bold text-sand-100 tracking-tight">
        {slide.title}
      </h1>

      {/* Subtitle with secondary styling */}
      <h2 className="text-h2 text-sand-300 font-normal max-w-2xl">
        {slide.subtitle}
      </h2>

      {/* Subtle divider */}
      <div className="w-16 h-0.5 bg-olive-600 mt-2" />
    </div>
  );
}
