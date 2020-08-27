import { easeQuadIn } from "d3";
import { min } from "lodash/fp";

const forceFocus = (focus) => {
  let nodes;

  const force = (alpha) => {
    let i;
    let node;

    for (i = 0; i < nodes.length; i += 1) {
      node = nodes[i];

      const isFocus = i === focus;
      const target = isFocus ? 1.2 : 1;

      if (node.scale !== target) {
        const diff = target - node.prevScale;
        const t = min([(1 - alpha) * 5, 1]);

        node.scale = node.prevScale + diff * easeQuadIn(t);
      }
    }
  };

  force.initialize = (_nodes) => {
    nodes = _nodes;
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].prevScale = nodes[i].scale;
    }
  };

  return force;
};

export default forceFocus;
