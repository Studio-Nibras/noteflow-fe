export default function treeLayout(nodes) {
  if (!nodes.length) return [];

  const spacingY = 140;
  const spacingX = 260;

  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: Math.floor(index / 4) * spacingX + 200,
      y: (index % 4) * spacingY + 100,
    },
  }));
}