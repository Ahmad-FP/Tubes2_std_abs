"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: isDark ? "rgba(30,30,30,0.8)" : "rgba(240,240,240,0.8)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(8px)",
      }}
      className="p-2.5 rounded-lg transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
      )}
    </button>
  );
}