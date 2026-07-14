import flowLayout from "../layouts/flowLayout";

const layouts = {
  flow: flowLayout,
};

export function getLayout(type) {
  return layouts[type] || flowLayout;
}