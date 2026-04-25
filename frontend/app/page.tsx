"use client";

import { useState } from "react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import InputPanel from "@/components/input-panel/InputPanel";
import TreeVisualizer from "@/components/tree-visualizer/TreeVisualizer";
import ResultPanel from "@/components/result-panel/ResultPanel";

export default function Home() {
  const [showTree, setShowTree] = useState(false);
  const [showResult, setShowResult] = useState(false);

  return (
    <main className="min-h-screen py-16 px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs tracking-[0.3em] uppercase mb-3 block"
          style={{ color: "var(--text-muted)" }}>
          IF2211 — Strategi Algoritma
        </span>
        <h1 className="text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}>
          DOM Tree Traversal
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Telusuri struktur pohon HTML menggunakan BFS & DFS
        </p>
      </div>

      {/* Input Panel */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="rounded-2xl p-8"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}>
          <InputPanel
            onScraped={() => setShowTree(true)}
            onTraversed={() => setShowResult(true)}
          />
        </div>
      </div>

      {/* Tree Visualizer */}
      <SectionWrapper id="tree-section" visible={showTree}>
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1"
              style={{ color: "var(--text-primary)" }}>
              Visualisasi Pohon DOM
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Struktur hierarki elemen HTML
            </p>
          </div>
          <div className="rounded-2xl p-6 h-[600px]"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}>
            <TreeVisualizer />
          </div>
        </div>
      </SectionWrapper>

      {/* Result */}
      <SectionWrapper id="result-section" visible={showResult}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-1"
              style={{ color: "var(--text-primary)" }}>
              Hasil Penelusuran
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Elemen yang ditemukan berdasarkan CSS selector
            </p>
          </div>
          <div className="rounded-2xl p-6"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-secondary)",
            }}>
            <ResultPanel />
          </div>
        </div>
      </SectionWrapper>

    </main>
  );
}