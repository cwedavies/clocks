import _ from "lodash/fp";
import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import usePhysicsLayout from "../../hooks/usePhysicsLayout";
import Clock, { getVariantSize } from "../Clock";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * getVariantSize(node.variant);

const center = (nodes) => {
  if (!nodes.length) {
    return { x: 0, y: 0 };
  }

  const { x, y } = _.reduce(
    (acc, val) => ({ x: acc.x + val.x, y: acc.y + val.y }),
    { x: 0, y: 0 },
    nodes
  );

  return {
    x: x / nodes.length,
    y: y / nodes.length,
  };
};

const PlayerClocks = (props) => {
  const { clocks } = props;

  const [focus, setFocus] = useState(null);
  const focusedIndex = _.findIndex({ id: focus }, clocks);
  const nodes = usePhysicsLayout(clocks, focusedIndex, radius);

  const [p, set] = useSpring(() => ({ x: 0, y: 0 }));
  const focused = nodes[focusedIndex];

  useEffect(() => {
    const target = focused || center(nodes);

    set({ x: 0, y: 0, ...target });
  }, [focused, nodes, set]);

  useEffect(() => {
    console.log(focus, focused);
  }, [focus, focused]);

  return (
    <g transform={`translate(${-p.x.value}, ${-p.y.value})`}>
      {mapWithKey((node) => {
        return (
          <Clock key={node.id} {...node} onClick={() => setFocus(node.id)} />
        );
      }, nodes)}
    </g>
  );
};

export default PlayerClocks;
