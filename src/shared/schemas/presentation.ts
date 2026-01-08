/**
 * Valibot schemas for presentation configuration validation
 */

import * as v from "valibot";

/** Schema for timeline event */
export const TimelineEventSchema = v.object({
  title: v.string(),
  description: v.optional(v.string()),
  date: v.optional(v.string()),
});

/** Schema for title-only slide */
export const TitleSlideSchema = v.object({
  type: v.literal("title"),
  title: v.string(),
});

/** Schema for title with subtitle slide */
export const TitleSubtitleSlideSchema = v.object({
  type: v.literal("title-subtitle"),
  title: v.string(),
  subtitle: v.string(),
});

/** Schema for text content slide */
export const TextSlideSchema = v.object({
  type: v.literal("text"),
  title: v.optional(v.string()),
  text: v.string(),
});

/** Schema for bullet points slide */
export const BulletsSlideSchema = v.object({
  type: v.literal("bullets"),
  title: v.optional(v.string()),
  items: v.array(v.string()),
});

/** Schema for code slide with morphing */
export const CodeSlideSchema = v.object({
  type: v.literal("code"),
  title: v.optional(v.string()),
  language: v.string(),
  blocks: v.array(v.string()),
});

/** Schema for vertical timeline slide */
export const TimelineSlideSchema = v.object({
  type: v.literal("timeline"),
  title: v.optional(v.string()),
  events: v.array(TimelineEventSchema),
});

/** Schema for info item */
export const InfoItemSchema = v.object({
  label: v.string(),
  value: v.optional(v.string()),
  description: v.optional(v.string()),
});

/** Schema for infographic slide */
export const InfoSlideSchema = v.object({
  type: v.literal("info"),
  title: v.optional(v.string()),
  items: v.array(InfoItemSchema),
});

/** Schema for closing slide */
export const ClosingSlideSchema = v.object({
  type: v.literal("closing"),
  message: v.string(),
  subtitle: v.optional(v.string()),
  author: v.optional(v.string()),
});

/** Schema for contact item */
export const ContactItemSchema = v.object({
  type: v.union([
    v.literal("email"),
    v.literal("website"),
    v.literal("social"),
    v.literal("phone"),
    v.literal("location"),
    v.literal("other"),
  ]),
  value: v.string(),
  label: v.optional(v.string()),
});

/** Schema for contact slide */
export const ContactSlideSchema = v.object({
  type: v.literal("contact"),
  title: v.optional(v.string()),
  name: v.optional(v.string()),
  role: v.optional(v.string()),
  contacts: v.array(ContactItemSchema),
});

/** Union schema for all slide types using discriminated union */
export const SlideSchema = v.variant("type", [
  TitleSlideSchema,
  TitleSubtitleSlideSchema,
  TextSlideSchema,
  BulletsSlideSchema,
  CodeSlideSchema,
  TimelineSlideSchema,
  InfoSlideSchema,
  ClosingSlideSchema,
  ContactSlideSchema,
]);

/** Schema for complete presentation */
export const PresentationSchema = v.object({
  slides: v.array(SlideSchema),
});

/** Inferred types from schemas */
export type ValidatedSlide = v.InferOutput<typeof SlideSchema>;
export type ValidatedPresentation = v.InferOutput<typeof PresentationSchema>;
export type ValidatedTimelineEvent = v.InferOutput<typeof TimelineEventSchema>;

/** Validation result type - discriminated union for proper type narrowing */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

/**
 * Validate a presentation configuration
 * @param data - Raw JSON data to validate
 * @returns Validation result with typed data or error messages
 */
export function validatePresentation(
  data: unknown
): ValidationResult<ValidatedPresentation> {
  const result = v.safeParse(PresentationSchema, data);

  if (result.success) {
    return {
      success: true,
      data: result.output,
    };
  }

  // Format error messages
  const errors = result.issues.map((issue) => {
    const path = issue.path?.map((p) => p.key).join(".") || "root";
    return `${path}: ${issue.message}`;
  });

  return {
    success: false,
    errors,
  };
}
