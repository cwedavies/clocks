import { useState, useLayoutEffect, useRef } from "react";
import { forceFocus, makeSimulation } from "../simulation";

const defaultRadius = (node) => node.scale * 200;

const usePhysicsLayout = (initial, focus, radius = defaultRadius) => {
  const simulation = useRef();
  const [nodes, setNodes] = useState([]);

  useLayoutEffect(() => {
    const update = () => setNodes([...simulation.current.nodes()]);

    simulation.current = makeSimulation(initial, { radius })
      .on("tick", update)
      .tick(300);

    update();
  }, [initial, radius]);

  useLayoutEffect(() => {
    simulation.current.force("focus", forceFocus(focus)).alpha(1).restart();
    return () => simulation.current.stop();
  }, [focus]);

  return nodes;
};

export default usePhysicsLayout;
