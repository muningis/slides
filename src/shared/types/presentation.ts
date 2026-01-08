/**
 * TypeScript types for all slide types
 * These are the canonical types used throughout the application
 */

/** Base slide properties shared by all slide types */
interface BaseSlide {
  title?: string | undefined;
}

/** Title-only slide */
export interface TitleSlide extends BaseSlide {
  type: "title";
  title: string;
}

/** Title with subtitle slide */
export interface TitleSubtitleSlide extends BaseSlide {
  type: "title-subtitle";
  title: string;
  subtitle: string;
}

/** Text content slide with optional title */
export interface TextSlide extends BaseSlide {
  type: "text";
  title?: string | undefined;
  text: string;
}

/** Bullet points slide with step-by-step reveal */
export interface BulletsSlide extends BaseSlide {
  type: "bullets";
  title?: string | undefined;
  items: string[];
}

/** Code slide with morphing between versions */
export interface CodeSlide extends BaseSlide {
  type: "code";
  title?: string | undefined;
  language: string;
  blocks: string[];
}

/** Timeline event for vertical timeline slide */
export interface TimelineEvent {
  title: string;
  description?: string | undefined;
  date?: string | undefined;
}

/** Vertical timeline slide with step-by-step reveal */
export interface TimelineSlide extends BaseSlide {
  type: "timeline";
  title?: string | undefined;
  events: TimelineEvent[];
}

/** Union of all slide types */
export type Slide =
  | TitleSlide
  | TitleSubtitleSlide
  | TextSlide
  | BulletsSlide
  | CodeSlide
  | TimelineSlide;

/** Presentation configuration */
export interface Presentation {
  slides: Slide[];
}

/**
 * Get the number of steps for a given slide
 * Single-step slides return 1, multi-step slides return their item count
 */
export function getSlideStepCount(slide: Slide): number {
  switch (slide.type) {
    case "title":
    case "title-subtitle":
    case "text":
      return 1;
    case "bullets":
      return slide.items.length;
    case "code":
      return slide.blocks.length;
    case "timeline":
      return slide.events.length;
  }
}
