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

/** Info item for infographic slides */
export interface InfoItem {
  label: string;
  value?: string | undefined;
  description?: string | undefined;
}

/** Infographic-style slide with data/statistics */
export interface InfoSlide extends BaseSlide {
  type: "info";
  title?: string | undefined;
  items: InfoItem[];
}

/** Closing/thank you slide */
export interface ClosingSlide extends BaseSlide {
  type: "closing";
  message: string;
  subtitle?: string | undefined;
  author?: string | undefined;
}

/** Contact item for contact slides */
export interface ContactItem {
  type: "email" | "website" | "social" | "phone" | "location" | "other";
  value: string;
  label?: string | undefined;
}

/** Contact information slide */
export interface ContactSlide extends BaseSlide {
  type: "contact";
  title?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  contacts: ContactItem[];
}

/** Union of all slide types */
export type Slide =
  | TitleSlide
  | TitleSubtitleSlide
  | TextSlide
  | BulletsSlide
  | CodeSlide
  | TimelineSlide
  | InfoSlide
  | ClosingSlide
  | ContactSlide;

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
    case "closing":
      return 1;
    case "bullets":
      return slide.items.length;
    case "code":
      return slide.blocks.length;
    case "timeline":
      return slide.events.length;
    case "info":
      return slide.items.length;
    case "contact":
      return 1;
  }
}
