import classnames from "classnames";
import _ from "lodash/fp";
import words from "random-words";
import React from "react";
import clocks from "../../clocks";
import { useClocks } from "../../context/clocks";
import { useDebug } from "../../hooks/debug";

import styles from "./debugControls.module.css";

const variants = _.keys(clocks);

const randomIndex = (coll) => _.random(0, coll.length - 1);

const randomText = () => words({ min: 3, max: 8, join: " " });

const randomMarks = () => _.random(0, 4);

const randomVariant = () => variants[randomIndex(variants)];

const DebugControls = (props) => {
  const { className: classNameProp } = props;

  const { debug } = useDebug();
  const { clocks, addClock, removeClock } = useClocks();

  if (!debug) {
    return null;
  }

  const addRandomClock = () =>
    addClock({
      text: randomText(),
      variant: randomVariant(),
      marks: randomMarks(),
    });
  const removeRandomClock = () => removeClock(randomIndex(clocks));

  const className = classnames(styles.root, classNameProp);

  return (
    <div className={className}>
      <button type="button" onClick={addRandomClock}>
        +
      </button>
      <button type="button" onClick={removeRandomClock}>
        –
      </button>
    </div>
  );
};

export default DebugControls;
