//tipe pohon DOM
export interface DomNode {
    id: string;
    tag: string;
    id_attr?: string;
    classes: string[];
    attributes: Record<string, string>;
    children: DomNode[];
    depth: number;
    path: string;
}

//tipe API request
export interface ScrapeRequest {
    mode: "url" | "html";
    input: string;
}

export interface TraverseRequest {
    tree: DomNode;
    algorithm: "bfs" | "dfs";
    selector: string;
    limit: number | -1;
}

export interface LcaRequest {
    tree: DomNode;
    node_a: string;
    node_b: string;
}

//tipe API response
export interface ScrapeResponse {
    tree: DomNode;
    max_depth: number;
}

export interface TraversalStep {
    step: number;
    node_id: string;
    node_tag: string;
    path: string;
    matched: boolean;
}

export interface TraverseResponse {
    matches: DomNode[];
    visited_count: number;
    execution_time_ms: number;
    traversal_log: TraversalStep[];
    highlighted_paths: string[];
}

export interface LcaResponse {
    lca_node: DomNode;
}

//Tipe UI State
export type Algorithm = "bfs" | "dfs";
export type InputMode = "url" | "html";
export type LimitMode = "all" | "top-n";

export interface AppState {
    inputMode: InputMode;
    inputValue: string;
    algorithm: Algorithm;
    selector: string;
    limitMode: LimitMode;
    limitN: number;

    domTree: DomNode | null;
    maxDepth: number;
    matches: DomNode[];
    visitedCount: number;
    executionTime: number;
    traversalLog: TraversalStep[];
    highlightedPaths: string[];

    isLoading: boolean;
    isScraping: boolean;
    error: string | null;
}