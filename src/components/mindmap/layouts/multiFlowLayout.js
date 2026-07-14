export default function multiFlowLayout(nodes) {
  if (!nodes.length) return [];

  const root = nodes[0];
  const children = nodes.slice(1);

  return [
    {
      ...root,
      position: {
        x: 450,
        y: 250,
      },
    },

    ...children.map((node, index) => {
      const isLeft = index % 2 === 0;
      const row = Math.floor(index / 2);

      return {
        ...node,
        position: {
          x: isLeft ? 150 : 750,
          y: 120 + row * 150,
        },
      };
    }),
  ];
}