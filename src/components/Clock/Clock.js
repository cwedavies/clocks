import _ from "lodash/fp";
import React from "react";
import Mark from "../Mark";
import Bounds from "./Bounds";

const mapWithKey = _.map.convert({ cap: false });

const Clock = (props) => {
  const {
    x,
    y,
    scale,
    FaceComponent = null,
    size,
    onClick,
    text,
    marks,
  } = props;

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <Bounds size={size} onClick={onClick} />
      {FaceComponent && <FaceComponent text={text} />}
      {mapWithKey(
        (mark, key) => (
          <Mark key={key} {...mark} />
        ),
        marks
      )}
    </g>
  );
};

export default Clock;
