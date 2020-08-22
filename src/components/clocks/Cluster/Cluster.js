import _ from "lodash/fp";
import classnames from "classnames";
import React, { useRef } from "react";
import { useDebug } from "../../../hooks/debug";

const SIZE = 200;

const Cluster = (props) => {
  const { x, y, scale, onClick, text } = props;
  const { debug } = useDebug();
  const id = useRef(_.uniqueId());
  const className = classnames({ debug });

  return (
    <g className={className} transform={`translate(${x},${y}) scale(${scale})`}>
      <defs>
        <path id={id.current} d="M -40 -160  L 160 -80" />
      </defs>
      <circle onClick={onClick} className="bounds" r={SIZE} />
      <circle r="60" cx="80" cy="-32" />
      <circle r="60" cx="-50" cy="-78" />
      <circle r="60" cx="72" cy="100" />
      <circle r="60" cx="-55" cy="58" />
      <text textAnchor="middle">
        <textPath href={`#${id.current}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </g>
  );
};

Cluster.size = 200;

export default Cluster;
