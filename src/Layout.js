import _ from "lodash/fp";
import classnames from "classnames";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceCollide,
} from "d3-force";
import { useSpring } from "react-spring";
import { easeQuadIn } from "d3";
import { useDebug } from "./debug";
import examples from "./clocks.example";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * 200;

const forceFocus = (focus) => {
  var nodes;

  const force = (alpha) => {
    var i, node;

    for (i = 0; i < nodes.length; ++i) {
      node = nodes[i];

      const isFocus = i === focus;
      const target = isFocus ? 1.2 : 1;

      if (node.scale === target) {
        continue;
      }

      const diff = target - node.prevScale;
      const t = _.min([(1 - alpha) * 5, 1]);

      node.scale = node.prevScale + diff * easeQuadIn(t);
    }
  };

  force.initialize = (_) => {
    nodes = _;
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
    console.log("start simulation");
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

    simulation.current.nodes().forEach((node) => {
      node.prevScale = node.scale;
    });

    simulation.current.force("focus", forceFocus(focus)).alpha(1).restart();
  }, [focus]);

  return { state, focus, setFocus };
};

const Circle = (props) => {
  const { x, y, scale, onClick, text } = props;
  const { debug } = useDebug();

  const id = useRef(_.uniqueId());

  const arcp = 200 * 0.75;

  const className = classnames({ debug });

  return (
    <g className={className} transform={`translate(${x},${y}) scale(${scale})`}>
      <defs>
        <path
          id={id.current}
          d={`M ${-arcp} 0 A ${arcp} ${arcp} 0 0 1 ${arcp} 0`}
        />
      </defs>
      <circle onClick={onClick} className="bounds" r={200}></circle>
      <circle r={200 * 0.7} />
      <text textAnchor="middle">
        <textPath href={`#${id.current}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </g>
  );
};

const Layout = (props) => {
  const { state, focus, setFocus } = useSimulation(examples);
  const [p, set] = useSpring(() => ({ x: 0, y: 0 }));

  const focused = state.nodes[focus];
  useEffect(() => {
    set(focused || { x: 0, y: 0 });
  }, [focus, focused, set]);

  return (
    <svg viewBox="-1080 -1920 2160 3840" preserveAspectRatio="xMidYMid meet">
      <g transform={`translate(${-p.x.value}, ${-p.y.value})`}>
        {mapWithKey(
          (node, index) => (
            <Circle
              onClick={() => setFocus(index)}
              key={index}
              text={node.text}
              scale={node.scale}
              x={node.x}
              y={node.y}
              debug={true}
            />
          ),
          state.nodes
        )}
      </g>
    </svg>
  );
};

export default Layout;
