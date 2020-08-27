import { map } from "lodash/fp";
import React, { useState, useLayoutEffect } from "react";
import { simulate } from "../../simulation";

const mapWithKey = map.convert({ cap: false });

const updateFocus = (focus, coll) =>
  mapWithKey(
    (node, key) => ({ ...node, scale: key === focus ? 1.2 : 1 }),
    coll
  );

const Layout = (props) => {
  const { focus, nodes: nodesProp, getComponent = () => {} } = props;
  const [nodes, setNodes] = useState(
    map((node) => ({ ...node, component: getComponent(node) }), nodesProp)
  );

  useLayoutEffect(() => {
    setNodes((n) => simulate(updateFocus(focus, n)));
  }, [focus]);

  return (
    <g>
      {mapWithKey((node, index) => {
        const Component = getComponent(node);
        return <Component key={index} {...node} />;
      }, nodes)}
    </g>
  );
};

export default Layout;
