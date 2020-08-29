import { easeCubicIn } from "d3";

const clamp = (lower, upper, value) => Math.max(lower, Math.min(upper, value));

const diff = (nodes, focus) => {
  const n = nodes.length;
  const target = nodes[focus] || null;
  if (target) {
    return [target.x, target.y];
  }

  let sx = 0;
  let sy = 0;

  for (let i = 0; i < n; i += 1) {
    sx += nodes[i].x;
    sy += nodes[i].y;
  }

  const dx = sx / n;
  const dy = sy / n;

  return [dx, dy];
};

const forceCenter = () => {
  let nodes;
  let focus;

  const force = (alpha) => {
    const n = nodes.length;

    if (!n) {
      return;
    }

    const t = easeCubicIn(clamp(0, 1, (1 - alpha - 0.2) * 1.5));

    const [dx, dy] = diff(nodes, focus);

    const x = dx * t;
    const y = dy * t;

    for (let i = 0; i < n; i += 1) {
      nodes[i].x -= x;
      nodes[i].y -= y;
    }
  };

  force.initialize = (_) => {
    nodes = _;
  };

  force.focus = (_) => {
    focus = _;
    console.log("target", nodes[focus]);
  };

  return force;
};

export default forceCenter;
