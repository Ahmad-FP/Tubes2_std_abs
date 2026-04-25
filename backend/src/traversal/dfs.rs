use super::{check_match, SearchResult, Selector, Step};
use crate::models::{DomTree, NodeId, NodeKind};
use std::time::Instant;

pub fn search(
    tree: &DomTree,
    sel: &Selector,
    sel_str: &str,
    limit: Option<usize>,
) -> SearchResult {
    let t0 = Instant::now();

    let mut stack: Vec<NodeId> = Vec::new();
    stack.push(tree.root);

    let mut visited: Vec<NodeId> = Vec::new();
    let mut log: Vec<Step> = Vec::new();
    let mut found: Vec<NodeId> = Vec::new();
    let mut step: usize = 0;

    while let Some(nid) = stack.pop() {
        let n = &tree.nodes[nid];
        visited.push(nid);
        log.push(Step {
            step,
            node_id: nid,
            action: "visit".to_string(),
            depth: n.depth,
        });
        step += 1;

        let is_elem = if let NodeKind::Element { .. } = &n.kind {
            true
        } else {
            false
        };
        if is_elem && check_match(tree, nid, sel) {
            found.push(nid);
            log.push(Step {
                step,
                node_id: nid,
                action: "match".to_string(),
                depth: n.depth,
            });
            step += 1;
            if let Some(lim) = limit {
                if found.len() >= lim {
                    break;
                }
            }
        }

        let kids = &n.children;
        let mut i = kids.len();
        while i > 0 {
            i -= 1;
            stack.push(kids[i]);
        }
    }

    SearchResult {
        algorithm: "DFS".to_string(),
        selector: sel_str.to_string(),
        total_visited: visited.len(),
        matches: found,
        visited,
        log,
        time_ms: t0.elapsed().as_secs_f64() * 1000.0,
    }
}
