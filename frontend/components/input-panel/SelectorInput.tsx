"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const EXAMPLES = ["div", ".container", "#header", "div > p", "ul li", "*"];

export default function SelectorInput() {
  const { selector, setSelector } = useAppStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer"
      style={{
        border: "1px solid var(--border)",
        backgroundColor: hovered ? "rgba(16,185,129,0.05)" : "var(--bg-secondary)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center 
                      justify-center mb-4 transition-all duration-300
                      group-hover:bg-emerald-600/30">
        <svg className="w-6 h-6 text-emerald-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        CSS Selector
      </h3>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Tentukan elemen yang ingin ditelusuri
      </p>

      {/* Input — muncul saat hover */}
      <div className={`transition-all duration-300 overflow-hidden
                       ${hovered ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
        <input
          type="text"
          value={selector}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setSelector(e.target.value)}
          placeholder="contoh: div.container > p"
          className="w-full px-3 py-2 rounded-lg text-sm font-mono mb-3
                     focus:outline-none focus:ring-2 focus:ring-emerald-500"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        />
        <div className="flex flex-wrap gap-1">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={(e) => { e.stopPropagation(); setSelector(ex); }}
              className="px-2 py-0.5 rounded text-xs font-mono transition-colors
                         hover:bg-emerald-500/20 hover:text-emerald-400"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-primary)",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Preview saat tidak hover */}
      {!hovered && (
        <p className="text-xs font-mono truncate" style={{ color: "var(--text-muted)" }}>
          {selector || "Hover untuk input..."}
        </p>
      )}
    </div>
  );
}