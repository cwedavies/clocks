import _ from "lodash/fp";
import React from "react";
import getVariantConfig from "./getVariantConfig";

const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const withVariants = (Component) => {
  const WithVariants = (props) => {
    const { variant: variantName, marks: marksProp } = props;
    const variantProps = getVariantConfig(variantName);

    const marks = _.isNumber(marksProp)
      ? _.take(marksProp, variantProps.positions)
      : marksProp;

    return <Component {...variantProps} {...props} marks={marks} />;
  };
  WithVariants.displayName = `WithVariants(${getDisplayName(Component)})`;

  return WithVariants;
};

export default withVariants;
