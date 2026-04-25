use serde::{Deserialize, Serialize};
use std::collections::HashMap;


pub type NodeId = usize;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum NodeKind {
    Element {
        tag: String,
        attrs: HashMap<String, String>,
        classes: Vec<String>,
        id: Option<String>,
    },
    Text(String),
    Comment(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DomNode {
    pub kind: NodeKind,
    pub parent: Option<NodeId>,
    pub children: Vec<NodeId>,
    pub depth: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DomTree {
    pub nodes: Vec<DomNode>,
    pub root: NodeId,
    pub max_depth: usize,
}

#[allow(dead_code)]
impl DomTree {
    pub fn new() -> Self {
        DomTree {
            nodes: vec![],
            root: 0,
            max_depth: 0,
        }
    }

    pub fn add_node(&mut self, node: DomNode) -> NodeId {
        let id = self.nodes.len();
        if node.depth > self.max_depth {
            self.max_depth = node.depth;
        }
        self.nodes.push(node);
        id
    }
}



#[derive(Debug, Deserialize)]
pub struct SearchRequest {
    pub html: Option<String>,
    pub url: Option<String>,
    pub algorithm: Algorithm,
    pub selector: String,
    pub limit: Option<usize>,
}

#[derive(Debug, Deserialize, PartialEq, Clone)]
#[serde(rename_all = "lowercase")]
pub enum Algorithm {
    Bfs,
    Dfs,
}

#[derive(Debug, Serialize)]
pub struct SearchResponse {
    pub dom_tree: DomTree,
    pub max_depth: usize,
    pub matches: Vec<NodeId>,
    pub visited: Vec<NodeId>,
    pub log: Vec<serde_json::Value>,
    pub total_visited: usize,
    pub time_ms: f64,
    pub algorithm: String,
    pub selector: String,
}
