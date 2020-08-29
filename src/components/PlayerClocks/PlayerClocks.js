import _ from "lodash/fp";
import React, { useState } from "react";
import usePhysicsLayout from "../../hooks/usePhysicsLayout";
import Clock, { getVariantSize } from "../Clock";

const mapWithKey = _.map.convert({ cap: false });

const radius = (node) => node.scale * getVariantSize(node.variant);

const PlayerClocks = (props) => {
  const { clocks } = props;

  const [focus, setFocus] = useState(null);
  const focusedIndex = _.findIndex({ id: focus }, clocks);
  const nodes = usePhysicsLayout(clocks, focusedIndex, radius);

  return (
    <g>
      {mapWithKey((node) => {
        return (
          <Clock key={node.id} {...node} onClick={() => setFocus(node.id)} />
        );
      }, nodes)}
    </g>
  );
};

export default PlayerClocks;
