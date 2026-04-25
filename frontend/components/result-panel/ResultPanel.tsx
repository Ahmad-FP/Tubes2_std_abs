"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import StatsBar from "./StatsBar";
import MatchList from "./MatchList";
import TraversalLog from "./TraversalLog";

type Tab = "matches" | "log";

export default function ResultPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("matches");
  const { matches, traversalLog } = useAppStore();

  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: "matches", label: "Elemen Match", count: matches.length },
    { value: "log", label: "Traversal Log", count: traversalLog.length },
  ];

  return (
    <div className="flex flex-col gap-4">
      <StatsBar />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === tab.value
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400"
                : "text-gray-400 hover:text-gray-300"
              }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full 
                               bg-gray-700 text-gray-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "matches" ? <MatchList /> : <TraversalLog />}
    </div>
  );
}