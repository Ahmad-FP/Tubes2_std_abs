"use client";

import { useAppStore } from "@/store/useAppStore";

export default function LimitInput() {
  const { limitMode, limitN, setLimitMode, setLimitN } = useAppStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Jumlah Hasil
      </label>
      <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setLimitMode("all")}
          className={`flex-1 py-1.5 text-xs font-medium transition-colors
            ${limitMode === "all"
              ? "bg-blue-600 text-white"
              : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          Semua
        </button>
        <button
          onClick={() => setLimitMode("top-n")}
          className={`flex-1 py-1.5 text-xs font-medium transition-colors
            ${limitMode === "top-n"
              ? "bg-blue-600 text-white"
              : "bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
        >
          Top-N
        </button>
      </div>
      {limitMode === "top-n" && (
        <input
          type="number"
          min={1}
          value={limitN}
          onChange={(e) => setLimitN(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 
                     dark:border-gray-700 bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}