import { easeQuadIn } from "d3";
import {
  forceCenter,
  forceCollide,
  forceManyBody,
  forceSimulation,
} from "d3-force";
import _ from "lodash/fp";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import examples from "../../clocks.example";
import { getClockComponent } from "../clocks";

import styles from "./player-clocks.module.css";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * getClockComponent(node.variant).size;

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
        const t = _.min([(1 - alpha) * 5, 1]);

        node.scale = node.prevScale + diff * easeQuadIn(t);
      }
    }
  };

  force.initialize = (_nodes) => {
    nodes = _nodes;
  };

  return force;
};

const toNode = (node) =>
  _.isString(node) ? toNode({ text: node }) : { ...node, scale: 1 };

const useSimulation = (nodes) => {
  const simulation = useRef();
  const collide = useRef();

  const [state, setState] = useState({ nodes: [] });
  const [focus, setFocus] = useState(null);

  const update = () => {
    if (!simulation.current) {
      return;
    }

    simulation.current.force("collide").radius(radius);
    setState({ nodes: simulation.current.nodes() });
  };

  useLayoutEffect(() => {
    collide.current = forceCollide().strength(0.1).radius(radius).iterations(1);

    simulation.current = forceSimulation(_.map(toNode, nodes))
      .force("collide", collide.current)
      .force("body", forceManyBody().strength(50))
      .force("center", forceCenter())
      .on("tick", update);

    return () => simulation.current.stop();
  }, [nodes]);

  useLayoutEffect(() => {
    if (!simulation.current) {
      return;
    }

    const n = simulation.current.nodes();
    for (let i = 0; i < n.length; i += 1) {
      n[i].prevScale = n[i].scale;
    }

    simulation.current.force("focus", forceFocus(focus)).alpha(1).restart();
  }, [focus, nodes]);

  return { state, focus, setFocus };
};

const Layout = () => {
  const { state, focus, setFocus } = useSimulation(examples);
  const [p, set] = useSpring(() => ({ x: 0, y: 0 }));

  const focused = state.nodes[focus];
  useEffect(() => {
    const { x = 0, y = 0 } = focused || {};
    set({ x, y });
  }, [focus, focused, set]);

  return (
    <svg
      className={styles.root}
      viewBox="-1080 -1920 2160 3840"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`translate(${-p.x.value}, ${-p.y.value})`}>
        {mapWithKey((node, index) => {
          const Clock = getClockComponent(node.variant);

          return (
            <Clock
              onClick={() => setFocus(index)}
              key={index}
              text={node.text}
              scale={node.scale}
              x={node.x}
              y={node.y}
              debug
            />
          );
        }, state.nodes)}
      </g>
    </svg>
  );
};

export default Layout;
