import _ from "lodash/fp";
import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import examples from "../../clocks.example";
import usePhysicsLayout from "../../hooks/usePhysicsLayout";
import Clock, { getVariantSize } from "../Clock";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * getVariantSize(node.variant);

const PlayerClocks = () => {
  const [focus, setFocus] = useState(null);
  const nodes = usePhysicsLayout(examples, focus, radius);

  const [p, set] = useSpring(() => ({ x: 0, y: 0 }));
  const focused = nodes[focus];

  useEffect(() => {
    const { x = 0, y = 0 } = focused || {};
    set({ x, y });
  }, [focus, focused, set]);

  return (
    <g transform={`translate(${-p.x.value}, ${-p.y.value})`}>
      {mapWithKey((node, key) => {
        return <Clock key={key} {...node} onClick={() => setFocus(key)} />;
      }, nodes)}
    </g>
  );
};

export default PlayerClocks;
