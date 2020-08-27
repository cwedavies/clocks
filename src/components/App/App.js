import React from "react";
import PlayerClocks from "../PlayerClocks";
import Version from "../Version";

import styles from "./app.module.css";

function App() {
  return (
    <>
      <svg
        className={styles.canvas}
        viewBox="-1080 -1920 2160 3840"
        preserveAspectRatio="xMidYMid meet"
      >
        <PlayerClocks />
      </svg>
      <Version />
    </>
  );
}

export default App;
