"use client";

import { useState } from "react";
import HeroSection from "@/components/shared/HeroSection";
import SectionWrapper from "@/components/shared/SectionWrapper";
import InputPanel from "@/components/input-panel/InputPanel";
import TreeVisualizer from "@/components/tree-visualizer/TreeVisualizer";
import ResultPanel from "@/components/result-panel/ResultPanel";

export default function Home() {
  const [showInput, setShowInput] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showResult, setShowResult] = useState(false);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <HeroSection onStart={() => setShowInput(true)} />

      {/* Input Section */}
      <SectionWrapper id="input-section" visible={showInput}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}>
              Konfigurasi Penelusuran
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Masukkan URL atau HTML, pilih algoritma, dan CSS selector
            </p>
          </div>
          <div className="rounded-2xl p-6"
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
      </SectionWrapper>

      {/* Tree Section */}
      <SectionWrapper id="tree-section" visible={showTree}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2"
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

      {/* Result Section */}
      <SectionWrapper id="result-section" visible={showResult}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2"
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