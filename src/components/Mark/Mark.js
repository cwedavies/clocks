import React from "react";

import styles from "./mark.module.css";

const size = 45;

const Mark = (props) => {
  const { x, y } = props;

  return (
    <g className={styles.root} transform={`translate(${x},${y})`}>
      <circle className={styles.line} r={size} />
      <circle r={size * 0.85} />
    </g>
  );
};

export default Mark;
