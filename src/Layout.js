import _ from "lodash/fp";
import classnames from "classnames";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceCollide,
} from "d3-force";
import { easeQuadInOut, easeCircleIn, easeQuadIn } from "d3";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * 200;

const initial = [
  { text: "guards! guards!" },
  { text: "A Poison seeping into the bones" },
  { text: "old one awakes" },
  {},
  {},
];

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
      const t = 1 - alpha;

      node.scale = node.prevScale + diff * easeQuadIn(t);
    }
  };

  force.initialize = (_) => {
    nodes = _;
  };

  return force;
};

const initializeNodes = (nodes) => {
  return _.map((node) => ({ ...node, scale: 1 }), nodes);
};

const useSimulation = () => {
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

    simulation.current = forceSimulation(initializeNodes(initial))
      .force("collide", collide.current)
      .force("body", forceManyBody().strength(50))
      .force("center", forceCenter())
      .on("tick", update);

    return () => simulation.current.stop();
  }, []);

  useLayoutEffect(() => {
    if (!simulation.current) {
      return;
    }

    simulation.current.nodes().forEach((node) => {
      node.prevScale = node.scale;
    });

    simulation.current.force("focus", forceFocus(focus)).alpha(1).restart();
  }, [focus]);

  return { state, setFocus };
};

const Circle = (props) => {
  const { x, y, scale, debug = false, onClick, text } = props;

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
      <circle onClick={onClick} className="bounds" r={200} />
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
  const { state, setFocus } = useSimulation();

  return (
    <svg
      viewBox="-1080 -1920 2160 3840"
      preserveAspectRatio="xMidYMid meet"
    >
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
    </svg>
  );
};

export default Layout;
