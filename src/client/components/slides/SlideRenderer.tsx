/**
 * SlideRenderer - Dispatches to correct slide type component
 */

import type { Slide } from "../../../shared/types/presentation.ts";
import { TitleSlide } from "./TitleSlide.tsx";
import { TitleSubtitleSlide } from "./TitleSubtitleSlide.tsx";
import { TextSlide } from "./TextSlide.tsx";
import { BulletsSlide } from "./BulletsSlide.tsx";
import { CodeSlide } from "./CodeSlide.tsx";
import { TimelineSlide } from "./TimelineSlide.tsx";
import { InfoSlide } from "./InfoSlide.tsx";
import { ClosingSlide } from "./ClosingSlide.tsx";
import { ContactSlide } from "./ContactSlide.tsx";

export interface SlideRendererProps {
  /** Slide data */
  slide: Slide;
  /** Current step for multi-step slides */
  currentStep: number;
}

/**
 * Renders the appropriate slide component based on slide type
 */
export function SlideRenderer({
  slide,
  currentStep,
}: SlideRendererProps): React.ReactElement {
  switch (slide.type) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "title-subtitle":
      return <TitleSubtitleSlide slide={slide} />;
    case "text":
      return <TextSlide slide={slide} />;
    case "bullets":
      return <BulletsSlide slide={slide} currentStep={currentStep} />;
    case "code":
      return <CodeSlide slide={slide} currentStep={currentStep} />;
    case "timeline":
      return <TimelineSlide slide={slide} currentStep={currentStep} />;
    case "info":
      return <InfoSlide slide={slide} currentStep={currentStep} />;
    case "closing":
      return <ClosingSlide slide={slide} />;
    case "contact":
      return <ContactSlide slide={slide} />;
    default:
      // TypeScript exhaustive check - unreachable if all slide types are handled
      throw new Error(
        `Unhandled slide type: ${(slide as { type: string }).type}`
      );
  }
}
