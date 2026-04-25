import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}