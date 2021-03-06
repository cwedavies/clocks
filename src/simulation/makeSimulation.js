import * as force from "d3-force";
import _ from "lodash/fp";
import forceCenter from "./forceCenter";
import forceCollide from "./forceCollide";

const center = forceCenter();

const forceManyBody = force.forceManyBody().strength(100);

const initializeNode = (node) =>
  _.isString(node) ? initializeNode({ text: node }) : { scale: 1, ...node };

const initializeNodes = _.map(initializeNode);

const makeSimulation = (
  nodes,
  { radius = (node) => node.scale * 200 } = {}
) => {
  return force
    .forceSimulation(initializeNodes(nodes))
    .stop()
    .force("collide", forceCollide().strength(0.1).radius(radius).iterations(1))
    .force("body", forceManyBody)
    .force("center", center);
};

export default makeSimulation;
