export function buildChildrenMap(edges) {
  const childrenMap = {};

  edges.forEach((edge) => {
    if (!childrenMap[edge.source]) {
      childrenMap[edge.source] = [];
    }

    childrenMap[edge.source].push(edge.target);
  });

  return childrenMap;
}

export function buildNodeMap(nodes) {
  const nodeMap = {};

  nodes.forEach((node) => {
    nodeMap[node.id] = node;
  });

  return nodeMap;
}

export function findRoot(nodes, edges) {
  const targetSet = new Set(
    edges.map((edge) => edge.target)
  );

  return nodes.find(
    (node) => !targetSet.has(node.id)
  );
}