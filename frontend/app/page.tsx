"use client";

import { useState, useRef } from "react";
import HeroSection from "@/components/shared/HeroSection";
import SectionWrapper from "@/components/shared/SectionWrapper";
import InputPanel from "@/components/input-panel/InputPanel";
import TreeVisualizer from "@/components/tree-visualizer/TreeVisualizer";
import ResultPanel from "@/components/result-panel/ResultPanel";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const [showInput, setShowInput] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { domTree, matches } = useAppStore();

  const handleStart = () => {
    setShowInput(true);
  };

  // Dipanggil dari InputPanel setelah scrape berhasil
  const handleScraped = () => {
    setShowTree(true);
  };

  // Dipanggil dari InputPanel setelah traversal berhasil
  const handleTraversed = () => {
    setShowResult(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <HeroSection onStart={handleStart} />

      {/* Input Section */}
      <SectionWrapper id="input-section" visible={showInput}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Konfigurasi Penelusuran
            </h2>
            <p className="text-gray-400">
              Masukkan URL atau HTML, pilih algoritma, dan CSS selector
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 
                          backdrop-blur-sm p-6">
            <InputPanel
              onScraped={handleScraped}
              onTraversed={handleTraversed}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Tree Visualizer Section */}
      <SectionWrapper id="tree-section" visible={showTree}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Visualisasi Pohon DOM
            </h2>
            <p className="text-gray-400">
              Struktur hierarki elemen HTML
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 
                          backdrop-blur-sm p-6 h-[600px]">
            <TreeVisualizer />
          </div>
        </div>
      </SectionWrapper>

      {/* Result Section */}
      <SectionWrapper id="result-section" visible={showResult}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Hasil Penelusuran
            </h2>
            <p className="text-gray-400">
              Elemen yang ditemukan berdasarkan CSS selector
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 
                          backdrop-blur-sm p-6">
            <ResultPanel />
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}