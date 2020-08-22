import _ from "lodash/fp";
import Basic from "./Basic";
import Cluster from "./Cluster";
import Small from "./Small";

const registry = {
  basic: Basic,
  cluster: Cluster,
  small: Small,
};

export const getClockComponent = (variant) => _.getOr(Basic, variant, registry);

export default getClockComponent;
