import makeSimulation from "./makeSimulation";

const simulate = (nodes, focus) => {
  return makeSimulation(nodes, focus).tick(300).nodes();
};

export default simulate;
