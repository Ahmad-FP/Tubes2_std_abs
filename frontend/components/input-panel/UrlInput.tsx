"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function UrlInput() {
  const { inputMode, inputValue, setInputMode, setInputValue } = useAppStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer"
      style={{
        border: "1px solid var(--border)",
        backgroundColor: hovered ? "rgba(59,130,246,0.05)" : "var(--bg-secondary)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center 
                      justify-center mb-4 transition-all duration-300
                      group-hover:bg-blue-600/30">
        <svg className="w-6 h-6 text-blue-400" fill="none" 
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Sumber HTML
      </h3>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Masukkan URL atau paste HTML langsung
      </p>

      {/* Input — muncul saat hover */}
      <div className={`transition-all duration-300 overflow-hidden
                       ${hovered ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>

        {/* Toggle */}
        <div className="flex rounded-lg overflow-hidden mb-3"
          style={{ border: "1px solid var(--border)" }}>
          {["url", "html"].map((mode) => (
            <button
              key={mode}
              onClick={(e) => { e.stopPropagation(); setInputMode(mode as "url" | "html"); }}
              className="flex-1 py-1.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: inputMode === mode ? "#2563eb" : "transparent",
                color: inputMode === mode ? "white" : "var(--text-muted)",
              }}
            >
              {mode === "url" ? "URL" : "Raw HTML"}
            </button>
          ))}
        </div>

        {/* Field */}
        {inputMode === "url" ? (
          <input
            type="text"
            value={inputValue}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
        ) : (
          <textarea
            value={inputValue}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="<html>...</html>"
            rows={4}
            className="w-full px-3 py-2 rounded-lg text-sm font-mono
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
        )}
      </div>

      {/* Preview saat tidak hover */}
      {!hovered && inputValue && (
        <p className="text-xs font-mono truncate" style={{ color: "var(--text-muted)" }}>
          {inputValue}
        </p>
      )}
      {!hovered && !inputValue && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Hover untuk input...
        </p>
      )}
    </div>
  );
}