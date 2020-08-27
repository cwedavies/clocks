import _ from "lodash/fp";
import React, { useRef } from "react";

const TextPath = (props) => {
  const { d, children } = props;
  const id = useRef(_.uniqueId());

  return (
    <g>
      <defs>
        <path id={id.current} d={d} />
      </defs>
      <text textAnchor="middle">
        <textPath href={`#${id.current}`} startOffset="50%">
          {children}
        </textPath>
      </text>
    </g>
  );
};

export default TextPath;
