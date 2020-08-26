import makeSimulation from "./makeSimulation";

const simulate = (nodes) => {
  return makeSimulation(nodes).tick(300).nodes();
};

export default simulate;
