import { easeCubicIn } from "d3";

const clamp = (lower, upper, value) => Math.max(lower, Math.min(upper, value));

const forceCenter = () => {
  let nodes;

  const force = (alpha) => {
    const n = nodes.length;
    let sx = 0;
    let sy = 0;

    for (let i = 0; i < n; i += 1) {
      sx += nodes[i].x;
      sy += nodes[i].y;
    }

    const beta = clamp(0, 1, 1 - alpha);
    const t = easeCubicIn(beta);

    const dx = (sx / n) * t;
    const dy = (sy / n) * t;

    for (let i = 0; i < n; i += 1) {
      nodes[i].x -= dx;
      nodes[i].y -= dy;
    }
  };

  force.initialize = (_) => {
    nodes = _;
  };

  return force;
};

export default forceCenter;
