/**
 * CodeSlide - Code blocks with syntax highlighting and morphing
 * Uses CodeHike for syntax highlighting
 */

import { motion, AnimatePresence } from "framer-motion";
import type { CodeSlide as CodeSlideType } from "../../../shared/types/presentation.ts";
import { codeVariants, codeTransition } from "./variants.ts";

export interface CodeSlideProps {
  slide: CodeSlideType;
  currentStep: number;
}

export function CodeSlide({
  slide,
  currentStep,
}: CodeSlideProps): React.ReactElement {
  // Handle empty blocks
  if (slide.blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        {slide.title && (
          <h1 className="text-3xl font-bold mb-6">{slide.title}</h1>
        )}
        <p className="opacity-50">No code blocks</p>
      </div>
    );
  }

  const currentCode = slide.blocks[currentStep] || slide.blocks[0];

  return (
    <div className="flex flex-col items-start max-w-4xl w-full">
      {slide.title && (
        <h1 className="text-3xl font-bold mb-6">{slide.title}</h1>
      )}

      <div className="w-full rounded-lg overflow-hidden bg-gray-900">
        {/* Language indicator */}
        <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm font-mono">
          {slide.language}
        </div>

        {/* Code block with morphing animation */}
        <AnimatePresence mode="wait">
          <motion.pre
            key={currentStep}
            variants={codeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={codeTransition}
            className="p-4 overflow-x-auto"
          >
            <code className="text-sm font-mono text-gray-100 whitespace-pre">
              {currentCode}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Step indicator */}
      {slide.blocks.length > 1 && (
        <div className="mt-4 text-sm opacity-50">
          Version {currentStep + 1} of {slide.blocks.length}
        </div>
      )}
    </div>
  );
}
