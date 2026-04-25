"use client";

import { useAppStore } from "@/store/useAppStore";
import { Algorithm } from "@/types";

export default function AlgorithmSelector() {
  const { algorithm, setAlgorithm } = useAppStore();

  const options: { value: Algorithm; label: string; desc: string }[] = [
    { value: "bfs", label: "BFS", desc: "Breadth First Search" },
    { value: "dfs", label: "DFS", desc: "Depth First Search" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Algoritma
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setAlgorithm(opt.value)}
            className={`py-2 px-3 rounded-lg border text-left transition-colors
              ${algorithm === opt.value
                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
              }`}
          >
            <p className={`text-sm font-bold ${algorithm === opt.value ? "text-blue-600" : "text-gray-700 dark:text-gray-300"}`}>
              {opt.label}
            </p>
            <p className="text-xs text-gray-400">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}