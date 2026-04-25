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

pub enum Combinator {
    Descendant,
    Child,
    AdjSibling,
    GenSibling,
}

pub struct SelPart {
    pub combinator: Combinator,
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

    match &parts[i].combinator {
        Combinator::Child => match tree.nodes[nid].parent {
            Some(p) => try_match(tree, p, parts, i - 1),
            None => false,
        },
        Combinator::Descendant => {
            let mut cur = tree.nodes[nid].parent;
            while let Some(p) = cur {
                if try_match(tree, p, parts, i - 1) {
                    return true;
                }
                cur = tree.nodes[p].parent;
            }
            false
        }
        Combinator::AdjSibling => {
            let parent = match tree.nodes[nid].parent {
                Some(p) => p,
                None => return false,
            };
            let siblings = &tree.nodes[parent].children;
            let my_idx = match siblings.iter().position(|&x| x == nid) {
                Some(idx) => idx,
                None => return false,
            };
            if my_idx == 0 {
                return false;
            }
            try_match(tree, siblings[my_idx - 1], parts, i - 1)
        }
        Combinator::GenSibling => {
            let parent = match tree.nodes[nid].parent {
                Some(p) => p,
                None => return false,
            };
            let siblings = &tree.nodes[parent].children;
            let my_idx = match siblings.iter().position(|&x| x == nid) {
                Some(idx) => idx,
                None => return false,
            };
            for j in 0..my_idx {
                if try_match(tree, siblings[j], parts, i - 1) {
                    return true;
                }
            }
            false
        }
    }
}
