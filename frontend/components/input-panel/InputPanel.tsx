"use client";

import { useAppStore } from "@/store/useAppStore";
import UrlInput from "./UrlInput";
import AlgorithmSelector from "./AlgorithmSelector";
import LimitInput from "./LimitInput";
import SelectorInput from "./SelectorInput";
import { scrapeHtml } from "@/lib/api/scrape";
import { traverseTree } from "@/lib/api/traverse";

interface InputPanelProps {
  onScraped?: () => void;
  onTraversed?: () => void;
}

export default function InputPanel({ onScraped, onTraversed }: InputPanelProps) {
  const {
    inputMode,
    inputValue,
    algorithm,
    selector,
    limitMode,
    limitN,
    isLoading,
    isScraping,
    domTree,
    setDomTree,
    setTraversalResult,
    setIsLoading,
    setIsScraping,
    setError,
  } = useAppStore();

  const handleScrape = async () => {
    if (!inputValue.trim()) {
      setError("Input tidak boleh kosong!");
      return;
    }
    try {
      setIsScraping(true);
      setError(null);
      const result = await scrapeHtml({ mode: inputMode, input: inputValue });
      setDomTree(result.tree, result.max_depth);
      onScraped?.();
    } catch (err) {
      setError("Gagal melakukan scraping. Periksa URL atau HTML kamu.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleTraverse = async () => {
    if (!domTree) {
      setError("Lakukan scraping terlebih dahulu!");
      return;
    }
    if (!selector.trim()) {
      setError("CSS Selector tidak boleh kosong!");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const result = await traverseTree({
        tree: domTree,
        algorithm,
        selector,
        limit: limitMode === "all" ? -1 : limitN,
      });
      setTraversalResult(
        result.matches,
        result.visited_count,
        result.execution_time_ms,
        result.traversal_log,
        result.highlighted_paths
      );
      onTraversed?.();
    } catch (err) {
      setError("Gagal melakukan traversal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="flex flex-col gap-12">

    {/* Cards Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UrlInput />
      <AlgorithmSelector />
      <SelectorInput />
    </div>

    {/* Error */}
    <ErrorMessage />

    {/* Buttons */}
    <div className="flex gap-4 justify-center">
      <button
        onClick={handleScrape}
        disabled={isScraping}
        className="group flex items-center gap-3 px-8 py-3 rounded-xl 
                   bg-blue-600 hover:bg-blue-500 text-white font-semibold 
                   text-sm transition-all disabled:opacity-40
                   hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {isScraping ? "Scraping..." : "Scrape & Parse HTML"}
      </button>

      <button
        onClick={handleTraverse}
        disabled={isLoading || !domTree}
        className="group flex items-center gap-3 px-8 py-3 rounded-xl
                   bg-emerald-600 hover:bg-emerald-500 text-white font-semibold
                   text-sm transition-all disabled:opacity-40
                   hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {isLoading ? "Traversing..." : "Run Traversal"}
      </button>
    </div>

  </div>
);
}

function ErrorMessage() {
  const { error } = useAppStore();
  if (!error) return null;
  return (
    <div className="p-3 rounded-lg bg-red-900/20 border border-red-800">
      <p className="text-sm text-red-400">{error}</p>
    </div>
  );
}