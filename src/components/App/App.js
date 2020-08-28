import React from "react";
import { useClocks } from "../../context/clocks";
import DebugControls from "../DebugControls";
import PlayerClocks from "../PlayerClocks";
import Version from "../Version";

import styles from "./app.module.css";

const App = () => {
  const { clocks } = useClocks();

  return (
    <>
      <svg
        className={styles.canvas}
        viewBox="-1080 -1920 2160 3840"
        preserveAspectRatio="xMidYMid meet"
      >
        <PlayerClocks clocks={clocks} />
      </svg>
      <DebugControls className={styles.controls} />
      <Version />
    </>
  );
};

export default App;
