import React from "react";
import { TextPath } from "../../components/SVG";

const FaceComponent = (props) => {
  const { label } = props;

  const arc = 120 * 0.75;

  return (
    <g>
      <TextPath d={`M ${-arc} 20 A ${arc} ${arc * 1.2} 0 0 1 ${arc} 20`}>
        {label}
      </TextPath>
      <circle r={120 * 0.7} />
    </g>
  );
};

export default FaceComponent;
