import React from "react";
import { useSpring, animated } from "react-spring";

import Layout from "./Animated";

export default {
  title: "Layouts/Animated",
  component: Layout,
  argTypes: {
    focus: {
      control: {
        type: "number",
        min: 0,
        max: 5,
      },
    },
  },
};

const Template = (args) => (
  <div
    style={{
      height: 500,
      border: "1px solid #999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      style={{ width: 1080, minWidth: 1080 }}
      viewBox="-1080 -1920 2160 3840"
      preserveAspectRatio="xMidYMid meet"
    >
      <Layout {...args} nodes={[{}, {}, {}, {}, {}, {}]} />
    </svg>
  </div>
);

const DummyComponent = ({ x = 0, y = 0, scale = 0 }) => {
  const props = useSpring({ cx: x, cy: y, r: 200 * scale });

  return <animated.circle fill="#333" {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
  focus: null,
  getComponent: () => DummyComponent,
};
