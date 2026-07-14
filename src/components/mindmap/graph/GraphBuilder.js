export function buildGraph(graphData) {
  const nodes = [];
  const edges = [];

  // Root Node
  nodes.push({
    id: "root",
    data: {
      label: graphData.topic,
    },
    position: {
      x: 0,
      y: 0,
    },
  });

  graphData.subtopics.forEach((subtopic, subIndex) => {
    const subId = `sub-${subIndex}`;

    nodes.push({
      id: subId,
      data: {
        label: subtopic.title,
      },
      position: {
        x: 0,
        y: 0,
      },
    });

    edges.push({
      id: `edge-root-${subId}`,
      source: "root",
      target: subId,
    });

    subtopic.details.forEach((detail, detailIndex) => {
      const detailId = `${subId}-detail-${detailIndex}`;

      nodes.push({
        id: detailId,
        data: {
          label: detail,
        },
        position: {
          x: 0,
          y: 0,
        },
      });

      edges.push({
        id: `edge-${subId}-${detailId}`,
        source: subId,
        target: detailId,
      });
    });
  });

  return {
    nodes,
    edges,
  };
}
