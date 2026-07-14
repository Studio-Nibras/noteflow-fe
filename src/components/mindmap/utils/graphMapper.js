export function mapNodes(nodes) {
  return nodes.map((node) => ({
    id: node.id,
    type: "mindNode",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: node.label,
    },
  }));
}

export function mapEdges(edges) {
  return edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: "flow",
  }));
}