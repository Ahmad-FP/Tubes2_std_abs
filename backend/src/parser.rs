use crate::models::{DomNode, DomTree, NodeId, NodeKind};
use scraper::Html;
use scraper::Node;
use std::collections::HashMap;

pub fn parse_html(html: &str) -> DomTree {
    let document = Html::parse_document(html);
    let mut tree = DomTree::new();

    let root_node = DomNode {
        kind: NodeKind::Element {
            tag: "document".to_string(),
            attrs: HashMap::new(),
            classes: vec![],
            id: None,
        },
        parent: None,
        children: vec![],
        depth: 0,
    };
    let root_id = tree.add_node(root_node);
    tree.root = root_id;


    let root_ref = document.tree.root();
    build_children(&mut tree, root_ref, root_id, 1);

    tree
}

fn build_children(
    tree: &mut DomTree,
    node_ref: ego_tree::NodeRef<scraper::Node>,
    parent_id: NodeId,
    depth: usize,
) {
    for child in node_ref.children() {
        let kind = match child.value() {
            Node::Element(el) => {
                let tag = el.name().to_lowercase();
                let mut attrs: HashMap<String, String> = HashMap::new();
                let mut classes: Vec<String> = vec![];
                let mut id: Option<String> = None;

                for (key, val) in el.attrs() {
                    let k = key.to_string();
                    let v = val.to_string();
                    if k == "class" {
                        classes = v.split_whitespace().map(|s| s.to_string()).collect();
                    } else if k == "id" {
                        id = Some(v.clone());
                    }
                    attrs.insert(k, v);
                }

                NodeKind::Element {
                    tag,
                    attrs,
                    classes,
                    id,
                }
            }
            Node::Text(t) => {
                let text = t.trim().to_string();
                if text.is_empty() {
                    continue;
                }
                NodeKind::Text(text)
            }
            Node::Comment(c) => NodeKind::Comment(c.to_string()),
            _ => continue,
        };

        let dom_node = DomNode {
            kind,
            parent: Some(parent_id),
            children: vec![],
            depth,
        };

        let node_id = tree.add_node(dom_node);
        tree.nodes[parent_id].children.push(node_id);


        build_children(tree, child, node_id, depth + 1);
    }
}
