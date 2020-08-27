/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { quadtree } from "d3";
import constant from "d3-force/src/constant";
import jiggle from "d3-force/src/jiggle";

function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

export default function (radiusProp) {
  let nodes;
  let random;
  let strength = 1;
  let iterations = 1;

  let radius =
    typeof radiusProp !== "function"
      ? radiusProp
      : constant(radiusProp == null ? 1 : +radiusProp);

  function prepare(quad) {
    if (quad.data) return (quad.r = radius(quad.data));
    for (let i = (quad.r = 0); i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function force() {
    let i;
    const n = nodes.length;
    let tree;
    let node;
    let xi;
    let yi;
    let ri;
    let ri2;

    function apply(quad, x0, y0, x1, y1) {
      const { data } = quad;
      let rj = quad.r;
      let r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          let x = xi - data.x - data.vx;
          let y = yi - data.y - data.vy;
          let l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) {
              x = jiggle(random);
              l += x * x;
            }
            if (y === 0) {
              y = jiggle(random);
              l += y * y;
            }
            l = ((r - (l = Math.sqrt(l))) / l) * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }

    for (let k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radius(node);
        ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
  }

  force.initialize = function (_nodes, _random) {
    nodes = _nodes;
    random = _random;
  };

  force.iterations = function (_) {
    return arguments.length ? ((iterations = +_), force) : iterations;
  };

  force.strength = function (_) {
    return arguments.length ? ((strength = +_), force) : strength;
  };

  force.radius = function (_) {
    return arguments.length
      ? (radius = typeof _ === "function" ? _ : constant(+_)) && force
      : radius;
  };

  return force;
}
