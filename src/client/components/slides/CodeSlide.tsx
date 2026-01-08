/**
 * CodeSlide - Code blocks with syntax highlighting and token morphing
 * Uses CodeHike for professional syntax highlighting with smooth token animations
 */

import { Pre } from "codehike/code";
import type { CodeSlide as CodeSlideType } from "../../../shared/types/presentation.ts";
import { useHighlightAll } from "../../hooks/useHighlight.ts";
import { tokenTransitions } from "./SmoothPre.tsx";

export interface CodeSlideProps {
  slide: CodeSlideType;
  currentStep: number;
}

/**
 * CodeSlide with CodeHike syntax highlighting and token morphing
 */
export function CodeSlide({
  slide,
  currentStep,
}: CodeSlideProps): React.ReactElement {
  const { highlights, isLoading } = useHighlightAll(
    slide.blocks,
    slide.language
  );

  // Handle empty blocks
  if (slide.blocks.length === 0) {
    return (
      <div className="flex flex-col items-start">
        {slide.title && (
          <h1 className="text-h1 font-bold mb-6 text-sand-100">{slide.title}</h1>
        )}
        <div
          className="w-64 h-40 rounded-slide bg-dot-pattern opacity-30"
          style={{ backgroundSize: "16px 16px" }}
        />
        <p className="text-sand-500 mt-4">No code blocks</p>
      </div>
    );
  }

  const safeStep = Math.min(currentStep, slide.blocks.length - 1);
  const currentHighlight = highlights[safeStep];

  return (
    <div className="flex flex-col items-start max-w-4xl w-full">
      {slide.title && (
        <h1 className="text-h1 font-bold mb-8 text-sand-100">{slide.title}</h1>
      )}

      {/* Code block - minimal, no wrapper */}
      <div className="w-full overflow-x-auto">
        {isLoading || !currentHighlight ? (
          <CodeSkeleton code={slide.blocks[safeStep] ?? ""} />
        ) : (
          <Pre
            code={currentHighlight}
            handlers={[tokenTransitions]}
            className="text-caption font-mono whitespace-pre leading-relaxed bg-transparent! p-0! m-0!"
            style={{
              ...currentHighlight.style,
              background: "transparent",
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Loading skeleton that shows unhighlighted code
 */
function CodeSkeleton({ code }: { code: string }): React.ReactElement {
  return (
    <pre className="animate-pulse">
      <code className="text-caption font-mono whitespace-pre leading-relaxed text-sand-400">
        {code}
      </code>
    </pre>
  );
}
