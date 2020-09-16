import { findIndex, map } from "lodash/fp";
import React, { useState } from "react";
import Clock, { getVariantSize } from "../../components/Clock";
import useClockSubscription from "../../hooks/useClockSubscription";
import usePhysicsLayout from "../../hooks/usePhysicsLayout";

import styles from "./PlayerView.module.css";

const radius = (node) => node.scale * getVariantSize(node.variant);

const PlayerView = () => {
  const clocks = useClockSubscription();
  const [focus, setFocusIndex] = useState(null);
  const nodes = usePhysicsLayout(clocks, focus, radius);

  const setFocus = (id) => setFocusIndex(findIndex({ id }, nodes));

  return (
    <div className={styles.root}>
      <svg
        className={styles.root}
        viewBox="-1080 -1920 2160 3840"
        preserveAspectRatio="xMidYMid meet"
      >
        {map(
          (node) => (
            <Clock key={node.id} {...node} onClick={() => setFocus(node.id)} />
          ),
          nodes
        )}
      </svg>
    </div>
  );
};

export default PlayerView;
