/**
 * Framer Motion animation variants for slide transitions
 * Uses only GPU-accelerated properties: transform (x, y, scale, rotate) and opacity
 */

import type { Variants } from "framer-motion";

/** Slide enter/exit animation variants */
export const slideVariants: Variants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
  },
};

/** Step reveal animation variants (for bullets, timeline, etc.) */
export const stepVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

/** Code block morphing variants */
export const codeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

/** Timeline connector line animation */
export const timelineLineVariants: Variants = {
  hidden: {
    scaleY: 0,
    originY: 0,
  },
  visible: {
    scaleY: 1,
  },
};

/** Standard transition config for smooth animations */
export const defaultTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

/** Faster transition for step reveals */
export const stepTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
};

/** Transition for code morphing */
export const codeTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};
