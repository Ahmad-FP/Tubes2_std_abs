import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/shared/ThemeToggle";

export const metadata: Metadata = {
  title: "DOM Tree Traversal",
  description: "BFS & DFS CSS Selector pada pohon DOM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}