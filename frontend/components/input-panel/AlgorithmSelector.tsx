"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Algorithm } from "@/types";

const options: { value: Algorithm; label: string; desc: string; detail: string }[] = [
  { value: "bfs", label: "BFS", desc: "Breadth First Search", detail: "Telusuri level per level" },
  { value: "dfs", label: "DFS", desc: "Depth First Search", detail: "Telusuri kedalaman dulu" },
];

export default function AlgorithmSelector() {
  const { algorithm, limitMode, limitN, setAlgorithm, setLimitMode, setLimitN } = useAppStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer"
      style={{
        border: "1px solid var(--border)",
        backgroundColor: hovered ? "rgba(139,92,246,0.05)" : "var(--bg-secondary)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center 
                      justify-center mb-4 transition-all duration-300
                      group-hover:bg-purple-600/30">
        <svg className="w-6 h-6 text-purple-400" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Algoritma & Limit
      </h3>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Pilih metode traversal dan jumlah hasil
      </p>

      {/* Input — muncul saat hover */}
      <div className={`transition-all duration-300 overflow-hidden
                       ${hovered ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>

        {/* Algorithm buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={(e) => { e.stopPropagation(); setAlgorithm(opt.value); }}
              className="py-2 px-3 rounded-lg text-left transition-all"
              style={{
                border: algorithm === opt.value
                  ? "1px solid #7c3aed"
                  : "1px solid var(--border)",
                backgroundColor: algorithm === opt.value
                  ? "rgba(124,58,237,0.15)"
                  : "transparent",
              }}
            >
              <p className="text-sm font-bold"
                style={{ color: algorithm === opt.value ? "#a78bfa" : "var(--text-primary)" }}>
                {opt.label}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {opt.detail}
              </p>
            </button>
          ))}
        </div>

        {/* Limit toggle */}
        <div className="flex rounded-lg overflow-hidden mb-2"
          style={{ border: "1px solid var(--border)" }}>
          {["all", "top-n"].map((mode) => (
            <button
              key={mode}
              onClick={(e) => { e.stopPropagation(); setLimitMode(mode as "all" | "top-n"); }}
              className="flex-1 py-1.5 text-xs font-medium transition-colors"
              style={{
                backgroundColor: limitMode === mode ? "#2563eb" : "transparent",
                color: limitMode === mode ? "white" : "var(--text-muted)",
              }}
            >
              {mode === "all" ? "Semua" : "Top-N"}
            </button>
          ))}
        </div>

        {limitMode === "top-n" && (
          <input
            type="number"
            min={1}
            value={limitN}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setLimitN(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
        )}
      </div>

      {/* Preview saat tidak hover */}
      {!hovered && (
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {algorithm.toUpperCase()} · {limitMode === "all" ? "Semua hasil" : `Top ${limitN}`}
        </p>
      )}
    </div>
  );
}