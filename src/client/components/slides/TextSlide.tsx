/**
 * TextSlide - Text content with optional title
 * Military-tech aesthetic: clean, readable, well-spaced
 */

import type { TextSlide as TextSlideType } from "../../../shared/types/presentation.ts";

export interface TextSlideProps {
  slide: TextSlideType;
}

export function TextSlide({ slide }: TextSlideProps): React.ReactElement {
  return (
    <div className="flex flex-col items-start max-w-3xl">
      {slide.title && (
        <h1 className="text-h1 font-bold mb-8 text-sand-100">
          {slide.title}
        </h1>
      )}

      {/* Text content with optimal reading width */}
      <p className="text-body leading-relaxed text-sand-300">
        {slide.text}
      </p>
    </div>
  );
}
