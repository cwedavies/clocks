import _ from "lodash/fp";
import React, { useRef } from "react";

import styles from "./mark.module.css";

const Mark = (props) => {
  const { x, y } = props;

  const rot = useRef(_.random(-10, 10));

  return (
    <g
      className={styles.root}
      transform={`translate(${x},${y}) rotate(${rot.current} 0 0) scale(2.5) translate(-22.5, -25.5) `}
    >
      <path d="M22.107,5.82c3.901,0.075 8.15,1.153 10.93,3.826c2.833,2.723 3.897,6.673 4.221,10.772c0.228,2.885 0.433,5.831 -0.864,8.532c-0.217,0.451 -0.587,0.816 -0.851,1.244c-0.147,0.24 -0.341,0.39 -0.555,0.505c-0.47,0.251 -1.041,0.33 -1.454,0.796c-0.327,0.37 -0.281,1.418 -0.641,1.759c-0.163,0.155 -0.196,0.559 -0.365,0.708c-2.9,2.545 -6.679,4.176 -10.413,4.372c-2.209,0.116 -4.224,-0.584 -6.294,-1.434c-2.097,-0.861 -3.904,-2.225 -5.366,-3.913c-2.415,-2.788 -4.231,-6.488 -4.519,-10.244c-0.191,-2.499 0.485,-5.008 1.418,-7.343c0.751,-1.877 1.888,-3.625 3.451,-5.121c2.898,-2.774 6.832,-4.381 10.887,-4.459c0.208,-0.001 0.208,-0.001 0.415,0Zm-0.377,3c-5.629,0.108 -10.517,4.481 -12.178,9.811c-0.286,0.92 -0.477,1.92 -0.558,2.879c-0.082,0.959 -0.055,1.877 0.094,2.842c0.172,1.116 0.506,2.224 1.022,3.299c1.287,2.681 3.488,5.877 6.195,7.07c4.107,1.809 10.32,0.953 14.146,-1.816c0.415,-0.299 1.33,-0.871 1.969,-1.336c0.213,-0.155 0.563,-0.198 0.686,-0.316c0.244,-0.233 0.241,-0.51 0.362,-0.663c0.348,-0.441 0.335,-0.691 0.792,-1.54c2.122,-3.946 1.247,-9.686 -1.014,-13.631c-2.33,-4.066 -6.538,-6.631 -11.516,-6.599Z" />
      <path d="M24.965,30.477c0.146,-0.072 0.144,-0.684 0.534,-0.61c1.183,0.227 3.698,1.296 3.754,1.689c0.075,0.523 -2.682,1.873 -3.344,1.641c-0.662,-0.232 -1.532,-2.429 -0.944,-2.72Z" />
      <path d="M24.592,25.948c1.378,0.016 7.348,-0.504 8.361,0.231c0.52,0.377 -0.216,1.229 -0.776,2.177c-0.532,0.899 -0.754,1.64 -1.4,1.741c-0.868,0.135 -2.668,-0.668 -4.117,-1.226c-0.823,-0.317 -1.534,-0.377 -1.897,-0.584c-0.395,-0.226 -0.07,-0.911 -0.103,-1.363c-0.024,-0.324 -0.394,-0.98 -0.068,-0.976Z" />
      <path d="M33.154,19.359c0.769,0.249 0.868,1.771 0.868,2.598c0,1.083 0.1,2.338 -0.931,2.558c-1.612,0.344 -7.278,0.088 -8.744,-0.493c-0.928,-0.368 -0.278,-2.477 -0.053,-2.995c0.123,-0.284 1.749,-0.388 4.056,-0.91c1.649,-0.374 3.858,-1.065 4.804,-0.758Z" />
      <path d="M23.574,34.021c-0.219,0.232 -1.106,0.115 -1.674,0.115c-2.035,0 -3.954,-0.505 -5.639,-1.397c-1.836,-0.972 -2.948,-1.407 -4.077,-3.145c-1.24,-1.911 -2.406,-5.188 -2.406,-7.637c0,-1.9 0.667,-3.203 1.465,-4.64c0.902,-1.624 2.029,-3.327 3.633,-4.502c0.677,-0.495 1.552,-1.082 2.309,-1.537c0.685,-0.412 1.395,-0.45 2.106,-0.709c0.825,-0.301 1.662,-0.791 2.609,-0.791c0.561,0 1.804,0.075 1.944,0.611c0.394,1.505 -0.562,2.824 -0.759,4.359c-0.184,1.44 -0.687,2.558 -0.74,4.014c-0.045,1.233 -0.049,2.465 -0.022,3.682c0.02,0.932 0.222,2.225 0.287,3.105c0.191,2.559 0.407,4.554 0.902,7.053c0.076,0.386 0.483,0.971 0.062,1.419Zm-7.393,-12.405c-0.171,0.515 -0.312,0.639 0.145,1.068c0.458,0.428 0.727,0.702 1.299,0.359c0.572,-0.343 0.972,-1.143 0.572,-1.658c-0.161,-0.207 -0.516,-0.078 -0.894,-0.129c-0.563,-0.077 -1.019,0.052 -1.122,0.36Z" />
      <path d="M31.016,13.933c0.437,0.086 0.441,0.949 0.948,1.763c0.486,0.78 0.296,1.612 -0.236,2.067c-0.656,0.562 -2.573,0.665 -4.355,1.02c-1.215,0.243 -2.386,0.858 -2.977,0.818c-0.372,-0.025 -0.337,-1.121 -0.171,-1.913c0.106,-0.508 0.193,-1.382 0.913,-1.471c1.842,-0.229 4.721,-2.512 5.878,-2.284Z" />
      <path d="M25.593,10.924c0.481,-0.229 1.646,-0.119 2.652,0.519c0.661,0.42 1.02,0.874 0.968,1.165c-0.053,0.292 -0.532,0.413 -1.111,0.822c-0.491,0.346 -0.77,0.83 -1.418,1.032c-0.514,0.161 -1.74,0.567 -1.917,0.473c-0.366,-0.196 -0.224,-1.108 0.017,-2.211c0.197,-0.9 0.451,-1.63 0.809,-1.8Z" />
    </g>
  );
};

export default Mark;
