import classnames from "classnames";
import _ from "lodash/fp";
import React, { useRef } from "react";
import { useDebug } from "../../../hooks/debug";
import Mark from "../../Mark";

const positions = [
  { x: 60, y: 60 },
  { x: 60, y: -60 },
  { x: -60, y: 60 },
  { x: -60, y: -60 },
];

const Basic = (props) => {
  const { x, y, scale, onClick, text, marks = 0 } = props;
  const { debug } = useDebug();

  const id = useRef(_.uniqueId());

  const arcp = 200 * 0.75;

  const className = classnames({ debug });

  const markPositions = _.take(marks, positions);

  return (
    <g className={className} transform={`translate(${x},${y}) scale(${scale})`}>
      <defs>
        <path
          id={id.current}
          d={`M ${-arcp} 0 A ${arcp} ${arcp} 0 0 1 ${arcp} 0`}
        />
      </defs>
      <circle onClick={onClick} className="bounds" r={200} />
      <circle r={200 * 0.7} />
      <text textAnchor="middle">
        <textPath href={`#${id.current}`} startOffset="50%">
          {text}
        </textPath>
      </text>
      {_.map(
        (position) => (
          <Mark {...position} />
        ),
        markPositions
      )}
    </g>
  );
};

Basic.size = 200;

export default Basic;
