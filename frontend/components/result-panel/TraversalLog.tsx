"use client";

import { useAppStore } from "@/store/useAppStore";

export default function TraversalLog() {
  const { traversalLog } = useAppStore();

  if (traversalLog.length === 0) {
    return (
      <div className="flex items-center justify-center py-4">
        <p className="text-gray-400 text-sm">Log kosong</p>
      </div>
    );
  }

  return (
    <div className="max-h-[180px] overflow-y-auto rounded-lg border 
                    border-gray-700 bg-gray-950 font-mono text-xs">
      {traversalLog.map((step) => (
        <div
          key={step.step}
          className={`flex items-center gap-3 px-3 py-1.5 border-b 
                      border-gray-800 last:border-0
                      ${step.matched
                        ? "bg-emerald-900/20 text-emerald-400"
                        : "text-gray-400"
                      }`}
        >
          <span className="text-gray-600 w-6 shrink-0">{step.step}</span>
          <span className="text-blue-400">&lt;{step.node_tag}&gt;</span>
          <span className="text-gray-500 truncate flex-1">{step.path}</span>
          {step.matched && (
            <span className="text-emerald-400 shrink-0">✓ match</span>
          )}
        </div>
      ))}
    </div>
  );
}