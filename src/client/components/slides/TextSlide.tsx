/**
 * TextSlide - Text content with optional title
 */

import type { TextSlide as TextSlideType } from "../../../shared/types/presentation.ts";

export interface TextSlideProps {
  slide: TextSlideType;
}

export function TextSlide({ slide }: TextSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl">
      {slide.title && (
        <h1 className="text-3xl font-bold mb-6 text-center">{slide.title}</h1>
      )}
      <p className="text-xl leading-relaxed">{slide.text}</p>
    </div>
  );
}
