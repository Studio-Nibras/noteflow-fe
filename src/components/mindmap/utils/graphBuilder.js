export function buildGraph(data) {
  const nodes = [];
  const edges = [];

  function traverse(node, parentId = null) {
    nodes.push({
      id: node.id,
      type: "custom",
      data: {
        label: node.label,
        isRoot: parentId === null,
      },
    });

    if (parentId) {
      edges.push({
        id: `e${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: "smoothstep",
      });
    }

    if (node.children) {
      node.children.forEach((child) => {
        traverse(child, node.id);
      });
    }
  }

  traverse(data);

  return {
    nodes,
    edges,
  };
}