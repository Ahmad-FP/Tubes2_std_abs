pub mod bfs;
pub mod dfs;

use crate::models::{DomTree, NodeId, NodeKind};
use serde::Serialize;

#[derive(Serialize)]
pub struct Step {
    pub step: usize,
    pub node_id: NodeId,
    pub action: String,
    pub depth: usize,
}

#[derive(Serialize)]
pub struct SearchResult {
    pub algorithm: String,
    pub selector: String,
    pub matches: Vec<NodeId>,
    pub visited: Vec<NodeId>,
    pub log: Vec<Step>,
    pub total_visited: usize,
    pub time_ms: f64,
}

pub struct SelPart {
    pub is_child: bool,
    pub tag: String,
    pub id: String,
    pub classes: Vec<String>,
    pub attrs: Vec<(String, String)>,
}

pub struct Selector {
    pub parts: Vec<SelPart>,
}

fn check_one(tree: &DomTree, nid: NodeId, p: &SelPart) -> bool {
    let n = &tree.nodes[nid];
    let (tag, attrs, classes, id) = match &n.kind {
        NodeKind::Element { tag, attrs, classes, id } => (tag, attrs, classes, id),
        _ => return false,
    };

    if !p.tag.is_empty() && &p.tag != tag {
        return false;
    }
    if !p.id.is_empty() {
        if id.as_deref() != Some(p.id.as_str()) {
            return false;
        }
    }
    for c in &p.classes {
        let mut has = false;
        for x in classes {
            if x == c {
                has = true;
                break;
            }
        }
        if !has {
            return false;
        }
    }
    for (k, v) in &p.attrs {
        let got = attrs.get(k);
        if got.is_none() {
            return false;
        }
        if !v.is_empty() && got.unwrap() != v {
            return false;
        }
    }
    true
}

pub fn check_match(tree: &DomTree, nid: NodeId, sel: &Selector) -> bool {
    if sel.parts.is_empty() {
        return false;
    }
    try_match(tree, nid, &sel.parts, sel.parts.len() - 1)
}

fn try_match(tree: &DomTree, nid: NodeId, parts: &[SelPart], i: usize) -> bool {
    if !check_one(tree, nid, &parts[i]) {
        return false;
    }
    if i == 0 {
        return true;
    }

    let parent = tree.nodes[nid].parent;
    if parts[i].is_child {
        match parent {
            Some(p) => try_match(tree, p, parts, i - 1),
            None => false,
        }
    } else {
        let mut cur = parent;
        while let Some(p) = cur {
            if try_match(tree, p, parts, i - 1) {
                return true;
            }
            cur = tree.nodes[p].parent;
        }
        false
    }
}
