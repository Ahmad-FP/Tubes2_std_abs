"use client";

import { Moon, Sun} from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToogle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);

    const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                 hover:bg-gray-200 dark:hover:bg-gray-700 
                 transition-colors duration-200"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}

