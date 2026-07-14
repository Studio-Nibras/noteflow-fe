import {
  buildChildrenMap,
  buildNodeMap,
  findRoot,
} from "../utils/graphTraversal";

export default function flowLayout(nodes, edges) {
  if (!nodes.length) return [];

  // ============================
  // Build children map
  // ============================

  const childrenMap = buildChildrenMap(edges);

  // ============================
  // Build node map
  // ============================

  const nodeMap = buildNodeMap(nodes);

  // ============================
  // Find root node
  // ============================

const root = findRoot(nodes, edges);

if (!root) return [];


  // ============================
  // Layout Result
  // ============================

  const layoutNodes = [];

  layoutNodes.push({
    ...root,
    position: {
      x: 200,
      y: 250,
    },
  });

  const spacingX = 280;
  const spacingY = 120;

  function traverse(parentId, level, startY) {
    const children = childrenMap[parentId] || [];

    children.forEach((childId, index) => {
      const childNode = nodeMap[childId];

      layoutNodes.push({
        ...childNode,
        position: {
          x: 200 + level * spacingX,
          y: startY + index * spacingY,
        },
      });

      traverse(
        childId,
        level + 1,
        startY + index * spacingY
      );
    });
  }

  traverse(root.id, 1, 120);

  return layoutNodes;
}