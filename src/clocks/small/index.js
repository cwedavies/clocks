import Face from "./FaceComponent";

const dist = 40;

export default {
  FaceComponent: Face,
  positions: [
    { x: 0, y: -dist },
    { x: dist, y: 0 },
    { x: 0, y: dist },
    { x: -dist, y: 0 },
  ],
  size: 120,
};
