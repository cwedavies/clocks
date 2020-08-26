import * as force from "d3-force";
import _ from "lodash/fp";

const forceCollide = force
  .forceCollide()
  .strength(0.1)
  .radius((node) => node.scale * 200)
  .iterations(1);

const forceManyBody = force.forceManyBody().strength(50);

const forceCenter = force.forceCenter();

const initializeNode = (node) =>
  _.isString(node) ? initializeNode({ text: node }) : { ...node, scale: 1 };

const initializeNodes = _.map(initializeNode);

const setFocus = (i, coll) => _.set([i, "scale"], 1.2, coll);

const makeSimulation = (nodes, focus) => {
  return force
    .forceSimulation(setFocus(focus, initializeNodes(nodes)))
    .stop()
    .force("collide", forceCollide)
    .force("body", forceManyBody)
    .force("center", forceCenter);
};

export default makeSimulation;
