"use client";

import { useAppStore } from "@/store/useAppStore";

const EXAMPLES = ["div", ".container", "#header", "div > p", "ul li", "*"];

export default function SelectorInput() {
  const { selector, setSelector } = useAppStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        CSS Selector
      </label>
      <input
        type="text"
        value={selector}
        onChange={(e) => setSelector(e.target.value)}
        placeholder="contoh: div.container > p"
        className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 
                   dark:border-gray-700 bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
      />
      {/* Quick examples */}
      <div className="flex flex-wrap gap-1">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setSelector(ex)}
            className="px-2 py-0.5 rounded text-xs font-mono
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-600 dark:text-gray-300
                       hover:bg-blue-100 dark:hover:bg-blue-900/30
                       hover:text-blue-600 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}