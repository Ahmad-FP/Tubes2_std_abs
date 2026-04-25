use super::{check_match, SearchResult, Selector, Step};
use crate::models::{DomTree, NodeId, NodeKind};
use std::collections::VecDeque;
use std::time::Instant;

pub fn search(
    tree: &DomTree,
    sel: &Selector,
    sel_str: &str,
    limit: Option<usize>,
) -> SearchResult {
    let t0 = Instant::now();

    let mut q: VecDeque<NodeId> = VecDeque::new();
    q.push_back(tree.root);

    let mut visited: Vec<NodeId> = Vec::new();
    let mut log: Vec<Step> = Vec::new();
    let mut found: Vec<NodeId> = Vec::new();
    let mut step: usize = 0;

    while let Some(nid) = q.pop_front() {
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

        for c in &n.children {
            q.push_back(*c);
        }
    }

    SearchResult {
        algorithm: "BFS".to_string(),
        selector: sel_str.to_string(),
        total_visited: visited.len(),
        matches: found,
        visited,
        log,
        time_ms: t0.elapsed().as_secs_f64() * 1000.0,
    }
}
