import { map, isNumber, find } from "lodash/fp";
import { useState, useLayoutEffect, useRef } from "react";
import { forceFocus, makeSimulation } from "../simulation";

const mapWithKey = map.convert({ cap: false });

const merge = (clocks, nodes) =>
  map((clock) => ({ ...find({ id: clock.id }, nodes), ...clock }), clocks);

const defaultRadius = (node) => node.scale * 200;

const initialRadius = 100;
const initialAngle = Math.PI * (3 - Math.sqrt(5));

const initNode = (node, i) => {
  let x;
  let y;

  if (!isNumber(node.x) || !isNumber(node.y)) {
    const radius = initialRadius * Math.sqrt(0.5 + i);
    const angle = i * initialAngle;
    x = radius * Math.cos(angle);
    y = radius * Math.sin(angle);
  }

  return {
    x,
    y,
    scale: 0.01,
    ...node,
  };
};

const usePhysicsLayout = (initial, focus, radius = defaultRadius) => {
  const simulation = useRef();
  const [nodes, setNodes] = useState([]);

  useLayoutEffect(() => {
    if (!simulation.current) {
      return () => {};
    }
    console.log("refocus");

    simulation.current.force("focus", forceFocus(focus));
    simulation.current.force("center").focus(focus);
    simulation.current.alpha(1).restart();
    return () => simulation.current.stop();
  }, [focus]);

  useLayoutEffect(() => {
    if (simulation.current) {
      console.log("rejig");
      const nodes = merge(initial, simulation.current.nodes());
      simulation.current.nodes(mapWithKey(initNode, nodes));
      simulation.current.force("focus", forceFocus(focus));
      simulation.current.alpha(1).restart();
      return;
    }
    console.log("start");

    const update = () => setNodes([...simulation.current.nodes()]);

    simulation.current = makeSimulation(initial, { radius })
      .on("tick", update)
      .tick(300);

    update();
  }, [focus, initial, radius]);

  return nodes;
};

export default usePhysicsLayout;
