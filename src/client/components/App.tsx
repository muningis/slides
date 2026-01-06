import type { ReactElement } from "react";

export default function App(): ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Slides</h1>
        <p className="text-xl text-slate-300 mb-8">
          A modern presentation application
        </p>
        <div className="flex gap-4 justify-center">
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
