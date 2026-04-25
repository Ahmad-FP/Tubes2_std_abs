"use client";

import { useAppStore } from "@/store/useAppStore";

export default function StatsBar() {
  const { matches, visitedCount, executionTime } = useAppStore();

  const stats = [
    {
      label: "Elemen Ditemukan",
      value: matches.length,
      color: "text-emerald-400",
    },
    {
      label: "Node Dikunjungi",
      value: visitedCount,
      color: "text-blue-400",
    },
    {
      label: "Waktu Pencarian",
      value: `${executionTime.toFixed(2)} ms`,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg bg-gray-800/50 border border-gray-700 p-3 text-center"
        >
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}