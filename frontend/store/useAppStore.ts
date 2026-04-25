import { create } from "zustand";
import {
    AppState,
    DomNode,
    TraversalStep,
    Algorithm,
    InputMode,
    LimitMode
} from "@/types";

interface AppStore extends AppState {
    //input actions
    setInputMode: (mode: InputMode) => void;
    setInputValue: (value: string) => void;
    setAlgorithm: (algorithm: Algorithm) => void;
    setSelector: (selector: string) => void;
    setLimitMode: (mode: LimitMode) => void;
    setLimitN: (n: number) => void;

    //result actions
    setDomTree: (tree: DomNode, maxDepth: number) => void;
    setTraversalResult: (
        matches: DomNode[],
        visitedCount: number,
        executionTime: number,
        traversalLog: TraversalStep[],
        highlightedPaths: string[]
    ) => void;

    setIsLoading: (loading: boolean) => void;
    setIsScraping: (scraping: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

const initialState: AppState = {
  inputMode: "url",
  inputValue: "",
  algorithm: "bfs",
  selector: "",
  limitMode: "all",
  limitN: 10,
  domTree: null,
  maxDepth: 0,
  matches: [],
  visitedCount: 0,
  executionTime: 0,
  traversalLog: [],
  highlightedPaths: [],
  isLoading: false,
  isScraping: false,
  error: null,
};

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,

  setInputMode: (mode) => set({ inputMode: mode }),
  setInputValue: (value) => set({ inputValue: value }),
  setAlgorithm: (algorithm) => set({ algorithm }),
  setSelector: (selector) => set({ selector }),
  setLimitMode: (mode) => set({ limitMode: mode }),
  setLimitN: (n) => set({ limitN: n }),

  setDomTree: (tree, maxDepth) => set({ domTree: tree, maxDepth }),
  setTraversalResult: (
    matches,
    visitedCount,
    executionTime,
    traversalLog,
    highlightedPaths
  ) =>
    set({
      matches,
      visitedCount,
      executionTime,
      traversalLog,
      highlightedPaths,
    }),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsScraping: (scraping) => set({ isScraping: scraping }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));