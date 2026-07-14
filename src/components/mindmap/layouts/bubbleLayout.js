export default function bubbleLayout(nodes) {
  if (!nodes.length) return [];

  const centerX = 450;
  const centerY = 250;
  const radius = 220;

  return nodes.map((node, index) => {
    if (index === 0) {
      return {
        ...node,
        position: {
          x: centerX,
          y: centerY,
        },
      };
    }

    const angle =
      (2 * Math.PI * (index - 1)) /
      (nodes.length - 1);

    return {
      ...node,
      position: {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      },
    };
  });
}