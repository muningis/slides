import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { Presentation } from "./presentation/Presentation.tsx";
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

export default function App(): ReactElement {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    const presentationUrl = window.__PRESENTATION_URL__;

    // If no URL, we already set no-presentation in initial state
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-white mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-xl text-slate-300">{state.message}</p>
        </div>
      </div>
    );
  }

  if (state.status === "no-presentation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Slides</h1>
          <p className="text-xl text-slate-300 mb-8">
            A modern presentation application
          </p>
          <p className="text-slate-400">
            Navigate to <code className="text-slate-200">/slides/your-presentation</code> to view a presentation
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <span className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 text-sm">
              React
            </span>
            <span className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 text-sm">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 text-sm">
              Tailwind
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Presentation presentation={state.presentation} />
    </div>
  );
}
