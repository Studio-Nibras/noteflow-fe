import flowLayout from "./flowLayout";
import treeLayout from "./treeLayout";
import bubbleLayout from "./bubbleLayout";
import multiFlowLayout from "./multiFlowLayout";

export function applyLayout(nodes, edges, layoutStyle) {
  switch (layoutStyle) {
    case "tree":
      return treeLayout(nodes);

    case "bubble":
      return bubbleLayout(nodes);

    case "multi-flow":
      return multiFlowLayout(nodes);

    case "flow":
    default:
      return flowLayout(nodes, edges);
  }
}