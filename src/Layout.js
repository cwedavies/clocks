import _ from "lodash/fp";
import classnames from "classnames";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceCollide,
} from "d3-force";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.size;

const initial = {
  nodes: [
    { size: 200, text: "guards! guards!" },
    { size: 200, text: "A Poison seeping into the bones" },
    { size: 200, text: "old one awakes"},
    { size: 200 },
    { size: 200 },
  ],
};

const forceFocus = (focus) => {
  var nodes;

  const force = (alpha) => {
    var i, node;

    for (i = 0; i < nodes.length; ++i) {
      node = nodes[i];

      const isFocus = i === focus;
      const target = isFocus ? 300 : 200;
      const diff = (target - node.size) / 100.0;

      node.size += diff * 2;
    }
  };

  force.initialize = (_) => {
    nodes = _;
  };

  return force;
};

const useSimulation = () => {
  const simulation = useRef();
  const collide = useRef();

  const [state, setState] = useState(initial);
  const [focus, setFocus] = useState(null);

  const update = () => {
    if (!simulation.current) {
      return;
    }

    simulation.current.force("collide").radius(radius);
    setState({ nodes: simulation.current.nodes() })
  };

  useLayoutEffect(() => {
    collide.current = forceCollide().strength(0.1).radius(radius).iterations(1);

    simulation.current = forceSimulation(initial.nodes)
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

    simulation.current
      .force("focus", forceFocus(focus))
      .alpha(1)
      .restart();
  }, [focus]);


  return { state, setFocus };
};

const Circle = (props) => {
  const { x, y, size, debug = false, onClick, text } = props;

  const id = useRef(_.uniqueId());
  const arcp = 200 * 0.75;

  const scale = size / 200;

  const className = classnames({ debug });

  return (
    <g className={className} transform={`translate(${x},${y}) scale(${scale})`}>
      <defs>
        <path id={id.current} d={`M ${-arcp} 0 A ${arcp} ${arcp} 0 0 1 ${arcp} 0`} />
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
  const { state, restart, setFocus } = useSimulation();

  return (
    <svg
      viewBox="-1080 -1920 2160 3840"
      preserveAspectRatio="xMidYMid meet"
      onClick={restart}
    >
      {mapWithKey(
        (node, index) => (
          <Circle
            onClick={() => setFocus(index)}
            key={index}
            text={node.text}
            size={node.size}
            x={node.x}
            y={node.y}
            debug={false}
          />
        ),
        state.nodes
      )}
    </svg>
  );
};

export default Layout;
