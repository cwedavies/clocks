import { map } from "lodash/fp";
import React, { useState, useLayoutEffect } from "react";
import { simulate } from "../../simulation";

import styles from "./layout.module.css";

const mapWithKey = map.convert({ cap: false });

const Layout = (props) => {
  const { focus, nodes: nodesProp, getComponent = () => {} } = props;
  const [nodes, setNodes] = useState(
    map((node) => ({ ...node, component: getComponent(node) }), nodesProp)
  );

  useLayoutEffect(() => {
    setNodes((n) => simulate(n, focus));
  }, [focus]);

  return (
    <svg
      className={styles.root}
      viewBox="-1080 -1920 2160 3840"
      preserveAspectRatio="xMidYMid meet"
    >
      {}
      {mapWithKey((node, index) => {
        const Component = getComponent(node);
        return <Component key={index} {...node} />;
      }, nodes)}
    </svg>
  );
};

export default Layout;
