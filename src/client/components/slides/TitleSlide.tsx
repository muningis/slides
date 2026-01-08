/**
 * TitleSlide - Simple title-only slide
 */

import type { TitleSlide as TitleSlideType } from "../../../shared/types/presentation.ts";

export interface TitleSlideProps {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: TitleSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{slide.title}</h1>
    </div>
  );
}
