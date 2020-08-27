import classnames from "classnames";
import React from "react";
import { useDebug } from "../../hooks/debug";

import styles from "./bounds.module.css";

const Bounds = (props) => {
  const { onClick, size, ...otherProps } = props;

  const { debug } = useDebug();
  const className = classnames(styles.root, { [styles.debug]: debug });

  return (
    <circle {...otherProps} className={className} onClick={onClick} r={size} />
  );
};

export default Bounds;
