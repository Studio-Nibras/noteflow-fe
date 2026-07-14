const sampleGraph = {
  id: "1",
  label: "Artificial Intelligence",

  children: [
    {
      id: "2",
      label: "Machine Learning",

      children: [
        {
          id: "3",
          label: "Supervised Learning",
        },

        {
          id: "4",
          label: "Unsupervised Learning",
        },
      ],
    },

    {
      id: "5",
      label: "Deep Learning",
    },
  ],
};

export default sampleGraph;