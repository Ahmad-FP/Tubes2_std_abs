"use client";

import { useAppStore } from "@/store/useAppStore";

export default function UrlInput() {
  const { inputMode, inputValue, setInputMode, setInputValue } = useAppStore();

  return (
    <div className="flex flex-col gap-2">
      {/* Toggle URL / HTML */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 
                      dark:border-gray-700">
        <button
          onClick={() => setInputMode("url")}
          className={`flex-1 py-1.5 text-xs font-medium transition-colors
            ${inputMode === "url"
              ? "bg-blue-600 text-white"
              : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          URL
        </button>
        <button
          onClick={() => setInputMode("html")}
          className={`flex-1 py-1.5 text-xs font-medium transition-colors
            ${inputMode === "html"
              ? "bg-blue-600 text-white"
              : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          Raw HTML
        </button>
      </div>

      {/* Input Field */}
      {inputMode === "url" ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 
                     dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="<html>...</html>"
          rows={6}
          className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 
                     dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     resize-none font-mono"
        />
      )}
    </div>
  );
}