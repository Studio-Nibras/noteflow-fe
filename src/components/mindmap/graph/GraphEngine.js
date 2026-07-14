import { getLayout } from "./LayoutManager";

export function buildGraph({
  nodes,
  edges,
  layout = "flow",
}) {
  const layoutFn = getLayout(layout);

  return layoutFn(nodes, edges);
}