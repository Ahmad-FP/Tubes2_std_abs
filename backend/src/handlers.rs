use crate::models::{Algorithm, DomTree, NodeId, NodeKind, SearchRequest, SearchResponse};
use crate::parser::parse_html;
use crate::scraper::fetch_html;
use crate::traversal::bfs;
use crate::traversal::dfs;
use crate::traversal::{SelPart, Selector};
use actix_web::{post, web, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FrontendDomNode {
    pub id: String,
    pub tag: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id_attr: Option<String>,
    pub classes: Vec<String>,
    pub attributes: std::collections::HashMap<String, String>,
    pub children: Vec<FrontendDomNode>,
    pub depth: usize,
    pub path: String,
}

fn tree_to_nested(tree: &DomTree, nid: NodeId, path: String) -> Option<FrontendDomNode> {
    let node = &tree.nodes[nid];
    match &node.kind {
        NodeKind::Element {
            tag,
            attrs,
            classes,
            id,
        } => {
            let node_id = format!("node-{}", nid);
            let current_path = if path.is_empty() {
                tag.clone()
            } else {
                format!("{} > {}", path, tag)
            };

            let children: Vec<FrontendDomNode> = node
                .children
                .iter()
                .filter_map(|&child_id| tree_to_nested(tree, child_id, current_path.clone()))
                .collect();

            Some(FrontendDomNode {
                id: node_id,
                tag: tag.clone(),
                id_attr: id.clone(),
                classes: classes.clone(),
                attributes: attrs.clone(),
                children,
                depth: node.depth,
                path: current_path,
            })
        }
        _ => None,
    }
}

fn matches_to_frontend(tree: &DomTree, match_ids: &[NodeId]) -> Vec<FrontendDomNode> {
    match_ids
        .iter()
        .filter_map(|&nid| {

            let path = build_path(tree, nid);
            let node = &tree.nodes[nid];
            match &node.kind {
                NodeKind::Element {
                    tag,
                    attrs,
                    classes,
                    id,
                } => Some(FrontendDomNode {
                    id: format!("node-{}", nid),
                    tag: tag.clone(),
                    id_attr: id.clone(),
                    classes: classes.clone(),
                    attributes: attrs.clone(),
                    children: vec![],
                    depth: node.depth,
                    path,
                }),
                _ => None,
            }
        })
        .collect()
}

fn build_path(tree: &DomTree, nid: NodeId) -> String {
    let mut parts = Vec::new();
    let mut current = nid;
    loop {
        let node = &tree.nodes[current];
        if let NodeKind::Element { tag, .. } = &node.kind {
            parts.push(tag.clone());
        }
        match node.parent {
            Some(p) => current = p,
            None => break,
        }
    }
    parts.reverse();
    parts.join(" > ")
}

#[derive(Debug, Deserialize)]
pub struct ScrapeRequest {
    pub mode: String,
    pub input: String,
}

#[derive(Debug, Serialize)]
pub struct ScrapeResponse {
    pub tree: FrontendDomNode,
    pub max_depth: usize,
}

#[post("/api/scrape")]
pub async fn api_scrape(req: web::Json<ScrapeRequest>) -> impl Responder {

    let html = if req.mode == "url" {
        match fetch_html(&req.input) {
            Ok(h) => h,
            Err(e) => return HttpResponse::BadRequest().json(json!({ "error": e })),
        }
    } else {
        req.input.clone()
    };


    let tree = parse_html(&html);
    let max_depth = tree.max_depth;


    let nested = tree_to_nested(&tree, tree.root, String::new());
    match nested {
        Some(root) => HttpResponse::Ok().json(ScrapeResponse {
            tree: root,
            max_depth,
        }),
        None => HttpResponse::InternalServerError()
            .json(json!({ "error": "Failed to convert DOM tree" })),
    }
}

#[derive(Debug, Deserialize)]
pub struct TraverseRequest {
    pub tree: serde_json::Value,
    pub algorithm: String,
    pub selector: String,
    pub limit: i64,
}

#[derive(Debug, Serialize)]
pub struct TraverseResponse {
    pub matches: Vec<FrontendDomNode>,
    pub visited_count: usize,
    pub execution_time_ms: f64,
    pub traversal_log: Vec<TraversalLogEntry>,
    pub highlighted_paths: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct TraversalLogEntry {
    pub step: usize,
    pub node_id: String,
    pub node_tag: String,
    pub path: String,
    pub matched: bool,
}

fn rebuild_arena(fe: &FrontendDomNode) -> DomTree {
    let mut tree = DomTree::new();
    rebuild_node(&mut tree, fe, None);
    tree
}

fn rebuild_node(tree: &mut DomTree, fe: &FrontendDomNode, parent: Option<NodeId>) -> NodeId {
    let kind = NodeKind::Element {
        tag: fe.tag.clone(),
        attrs: fe.attributes.clone(),
        classes: fe.classes.clone(),
        id: fe.id_attr.clone(),
    };

    let dom_node = crate::models::DomNode {
        kind,
        parent,
        children: vec![],
        depth: fe.depth,
    };

    let nid = tree.add_node(dom_node);
    if parent.is_none() {
        tree.root = nid;
    }

    for child in &fe.children {
        let child_id = rebuild_node(tree, child, Some(nid));
        tree.nodes[nid].children.push(child_id);
    }

    nid
}

#[post("/api/traverse")]
pub async fn api_traverse(req: web::Json<TraverseRequest>) -> impl Responder {

    let fe_tree: FrontendDomNode = match serde_json::from_value(req.tree.clone()) {
        Ok(t) => t,
        Err(e) => {
            return HttpResponse::BadRequest()
                .json(json!({ "error": format!("Invalid tree: {}", e) }))
        }
    };


    let arena_tree = rebuild_arena(&fe_tree);


    let sel = parse_selector(&req.selector);


    let limit = if req.limit < 0 {
        None
    } else {
        Some(req.limit as usize)
    };


    let algo = req.algorithm.to_lowercase();
    let result = if algo == "bfs" {
        bfs::search(&arena_tree, &sel, &req.selector, limit)
    } else {
        dfs::search(&arena_tree, &sel, &req.selector, limit)
    };


    let fe_matches = matches_to_frontend(&arena_tree, &result.matches);


    let highlighted_paths: Vec<String> = result
        .matches
        .iter()
        .map(|&nid| build_path(&arena_tree, nid))
        .collect();


    let log_entries: Vec<TraversalLogEntry> = result
        .log
        .iter()
        .map(|s| {
            let node = &arena_tree.nodes[s.node_id];
            let node_tag = match &node.kind {
                NodeKind::Element { tag, .. } => tag.clone(),
                NodeKind::Text(_) => "#text".to_string(),
                NodeKind::Comment(_) => "#comment".to_string(),
            };
            let path = build_path(&arena_tree, s.node_id);
            TraversalLogEntry {
                step: s.step,
                node_id: format!("node-{}", s.node_id),
                node_tag,
                path,
                matched: s.action == "match",
            }
        })
        .collect();

    HttpResponse::Ok().json(TraverseResponse {
        matches: fe_matches,
        visited_count: result.total_visited,
        execution_time_ms: result.time_ms,
        traversal_log: log_entries,
        highlighted_paths,
    })
}

fn parse_selector(selector: &str) -> Selector {
    let mut parts: Vec<SelPart> = vec![];
    let raw_parts: Vec<&str> = selector.split_whitespace().collect();
    let mut i = 0;

    while i < raw_parts.len() {
        let token = raw_parts[i];

        if token == ">" {

            i += 1;
            if i < raw_parts.len() {
                let mut p = parse_single(raw_parts[i]);
                p.is_child = true;
                parts.push(p);
            }
        } else {
            let p = parse_single(token);
            parts.push(p);
        }
        i += 1;
    }

    Selector { parts }
}

fn parse_single(token: &str) -> SelPart {
    let mut tag = String::new();
    let mut id = String::new();
    let mut classes: Vec<String> = vec![];
    let attrs: Vec<(String, String)> = vec![];


    if token == "*" {
        return SelPart {
            is_child: false,
            tag,
            id,
            classes,
            attrs,
        };
    }

    let mut current = String::new();
    let mut mode = 't';

    for ch in token.chars() {
        match ch {
            '.' => {
                if mode == 't' {
                    tag = current.clone();
                } else if mode == 'c' {
                    classes.push(current.clone());
                } else if mode == 'i' {
                    id = current.clone();
                }
                current.clear();
                mode = 'c';
            }
            '#' => {
                if mode == 't' {
                    tag = current.clone();
                } else if mode == 'c' {
                    classes.push(current.clone());
                } else if mode == 'i' {
                    id = current.clone();
                }
                current.clear();
                mode = 'i';
            }
            _ => current.push(ch),
        }
    }


    if mode == 't' {
        tag = current.clone();
    } else if mode == 'c' {
        classes.push(current.clone());
    } else if mode == 'i' {
        id = current.clone();
    }

    SelPart {
        is_child: false,
        tag,
        id,
        classes,
        attrs,
    }
}

#[post("/search")]
pub async fn search(req: web::Json<SearchRequest>) -> impl Responder {

    let html = if let Some(url) = &req.url {
        match fetch_html(url) {
            Ok(h) => h,
            Err(e) => return HttpResponse::BadRequest().json(json!({ "error": e })),
        }
    } else if let Some(h) = &req.html {
        h.clone()
    } else {
        return HttpResponse::BadRequest().json(json!({ "error": "url or html required" }));
    };


    let tree = parse_html(&html);
    let max_depth = tree.max_depth;


    let sel = parse_selector(&req.selector);


    let result = match req.algorithm {
        Algorithm::Bfs => bfs::search(&tree, &sel, &req.selector, req.limit),
        Algorithm::Dfs => dfs::search(&tree, &sel, &req.selector, req.limit),
    };


    let log_json: Vec<serde_json::Value> = result
        .log
        .iter()
        .map(|s| {
            json!({
                "step": s.step,
                "node_id": s.node_id,
                "action": s.action,
                "depth": s.depth,
            })
        })
        .collect();


    let response = SearchResponse {
        dom_tree: tree,
        max_depth,
        matches: result.matches,
        visited: result.visited,
        log: log_json,
        total_visited: result.total_visited,
        time_ms: result.time_ms,
        algorithm: result.algorithm,
        selector: result.selector,
    };

    HttpResponse::Ok().json(response)
}
