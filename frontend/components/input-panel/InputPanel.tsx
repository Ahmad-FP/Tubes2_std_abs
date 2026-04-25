"use client";

import { useAppStore } from "@/store/useAppStore";
import UrlInput from "./UrlInput";
import AlgorithmSelector from "./AlgorithmSelector";
import SelectorInput from "./SelectorInput";
import LimitInput from "./LimitInput";
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
  <div className="flex flex-col gap-5">

    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}>
        01 — Sumber HTML
      </p>
      <UrlInput />
    </div>

    <div style={{ borderTop: "1px solid var(--border)" }} />

    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}>
        02 — Konfigurasi Traversal
      </p>
      <div className="grid grid-cols-2 gap-4">
        <AlgorithmSelector />
        <LimitInput />
      </div>
    </div>

    <div style={{ borderTop: "1px solid var(--border)" }} />

    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}>
        03 — CSS Selector
      </p>
      <SelectorInput />
    </div>

    <div style={{ borderTop: "1px solid var(--border)" }} />

    <ErrorMessage />

    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={handleScrape}
        disabled={isScraping}
        className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-semibold text-sm transition-all
                   hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        {isScraping ? "Scraping..." : "🔍 Scrape & Parse"}
      </button>
      <button
        onClick={handleTraverse}
        disabled={isLoading || !domTree}
        className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-semibold text-sm transition-all
                   hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
      >
        {isLoading ? "Traversing..." : "▶ Run Traversal"}
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