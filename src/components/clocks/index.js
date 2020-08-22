import _ from "lodash/fp";
import Basic from "./Basic";
import Small from "./Small";

const registry = {
  basic: Basic,
  small: Small,
};

export const getClockComponent = (variant) => _.getOr(Basic, variant, registry);

export default getClockComponent;
