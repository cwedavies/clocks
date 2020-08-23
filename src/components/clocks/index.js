import _ from "lodash/fp";
import Basic from "./Basic";
import Cluster from "./Cluster";
import Small from "./Small";
import Fancy from "./Fancy";

const registry = {
  basic: Basic,
  cluster: Cluster,
  fancy: Fancy,
  small: Small,
};

export const getClockComponent = (variant) => _.getOr(Fancy, variant, registry);

export default getClockComponent;
