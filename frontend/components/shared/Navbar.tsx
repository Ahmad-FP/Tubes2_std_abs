import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-800 
                    bg-white dark:bg-gray-950 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-bold">D</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            DOM Traversal
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            BFS & DFS CSS Selector
          </p>
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
}