import _ from "lodash/fp";
import classnames from "classnames";
import React, { useRef } from "react";
import { useDebug } from "../../../hooks/debug";

const SIZE = 120;

const Small = (props) => {
  const { x, y, scale, onClick, text } = props;
  const { debug } = useDebug();
  const id = useRef(_.uniqueId());
  const className = classnames({ debug });

  const arcp = SIZE * 0.75;

  return (
    <g className={className} transform={`translate(${x},${y}) scale(${scale})`}>
      <defs>
        <path
          id={id.current}
          d={`M ${-arcp} 0 A ${arcp} ${arcp} 0 0 1 ${arcp} 0`}
        />
      </defs>
      <circle onClick={onClick} className="bounds" r={SIZE} />
      <circle r={SIZE * 0.7} />
      <text textAnchor="middle">
        <textPath href={`#${id.current}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </g>
  );
};

Small.size = SIZE;

export default Small;
