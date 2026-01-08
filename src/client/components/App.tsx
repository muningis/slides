import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Presentation } from "./presentation/Presentation.tsx";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { AnimatedBackground } from "./background/AnimatedBackground.tsx";
import { validatePresentation } from "../../shared/schemas/presentation.ts";
import type { Presentation as PresentationType } from "../../shared/types/presentation.ts";

/** Global window properties set by server */
declare global {
  interface Window {
    __PRESENTATION_URL__?: string;
    __PRESENTATION_SLUG__?: string;
  }
}

type AppState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; presentation: PresentationType }
  | { status: "no-presentation" };

/** Determine initial state based on whether presentation URL exists */
function getInitialState(): AppState {
  if (typeof window !== "undefined" && window.__PRESENTATION_URL__) {
    return { status: "loading" };
  }
  return { status: "no-presentation" };
}

/** Loading state component with themed styling */
function LoadingState(): ReactElement {
  return (
    <div className="min-h-screen bg-olive-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Pulsing lime accent */}
          <div className="absolute inset-0 bg-lime-glow opacity-50 animate-lime-pulse" />
          <div className="text-h2 text-sand-100 mb-4 relative">Loading...</div>
        </div>
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-lime-500 animate-lime-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Error state component with themed styling */
function ErrorState({ message }: { message: string }): ReactElement {
  return (
    <div className="min-h-screen bg-olive-950 flex items-center justify-center">
      <div className="text-center max-w-lg px-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-h1 font-bold text-red-400 mb-4">Error</h1>
        <p className="text-body text-sand-300">{message}</p>
      </div>
    </div>
  );
}

/** No presentation state - landing page */
function NoPresentationState(): ReactElement {
  return (
    <div className="min-h-screen bg-olive-950 flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />

      <div className="text-center relative z-10">
        <h1 className="text-display font-bold text-sand-100 mb-4 tracking-tight">
          Slides
        </h1>
        <p className="text-h3 text-sand-300 mb-8 font-normal">
          A modern presentation application
        </p>
        <p className="text-body text-sand-500 mb-8">
          Navigate to{" "}
          <code className="px-2 py-1 bg-olive-800 rounded text-lime-500 font-mono text-caption">
            /slides/your-presentation
          </code>{" "}
          to view a presentation
        </p>

        {/* Tech badges */}
        <div className="flex gap-3 justify-center mt-8">
          {["React", "TypeScript", "Tailwind"].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-olive-800/50 border border-olive-600 rounded-slide text-sand-300 text-caption transition-all duration-150 hover:border-lime-600 hover:text-lime-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Main App component wrapped with ThemeProvider */
function AppContent(): ReactElement {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    const presentationUrl = window.__PRESENTATION_URL__;

    if (!presentationUrl) {
      return;
    }

    async function loadPresentation(): Promise<void> {
      try {
        const response = await fetch(presentationUrl!);

        if (!response.ok) {
          setState({
            status: "error",
            message: `Failed to load presentation: ${response.status} ${response.statusText}`,
          });
          return;
        }

        const data: unknown = await response.json();
        const result = validatePresentation(data);

        if (!result.success) {
          setState({
            status: "error",
            message: `Invalid presentation: ${result.errors.join(", ")}`,
          });
          return;
        }

        setState({ status: "ready", presentation: result.data });
      } catch (error) {
        setState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    void loadPresentation();
  }, []);

  if (state.status === "loading") {
    return <LoadingState />;
  }

  if (state.status === "error") {
    return <ErrorState message={state.message} />;
  }

  if (state.status === "no-presentation") {
    return <NoPresentationState />;
  }

  return (
    <div className="h-screen bg-olive-950 text-sand-100 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 h-full">
        <Presentation presentation={state.presentation} />
      </div>
    </div>
  );
}

export default function App(): ReactElement {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
