/**
 * TitleSubtitleSlide - Title with subtitle slide
 */

import type { TitleSubtitleSlide as TitleSubtitleSlideType } from "../../../shared/types/presentation.ts";

export interface TitleSubtitleSlideProps {
  slide: TitleSubtitleSlideType;
}

export function TitleSubtitleSlide({
  slide,
}: TitleSubtitleSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-4xl font-bold">{slide.title}</h1>
      <h2 className="text-2xl opacity-75">{slide.subtitle}</h2>
    </div>
  );
}
