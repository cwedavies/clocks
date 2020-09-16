import { map } from "lodash/fp";
import React from "react";
import Input from "../../components/Input";
import { useWebsocket } from "../../context/Websocket";
import useClockSubscription from "../../hooks/useClockSubscription";

import styles from "./GMView.module.css";

const actionChangeLabel = (clock, label) => ({
  action: "clock/change/request",
  payload: { ...clock, label },
});

const actionMark = (clock) => ({
  action: "clock/change/request",
  payload: { ...clock, marks: (clock.marks || 0) + 1 },
});

const actionUnmark = (clock) => ({
  action: "clock/change/request",
  payload: { ...clock, marks: Math.max(0, clock.marks - 1) },
});

const GMView = () => {
  const { send } = useWebsocket();
  const clocks = useClockSubscription();

  return (
    <div className={styles.root}>
      <ul className={styles.container}>
        {map(
          (clock) => (
            <li key={clock.id}>
              <Input
                value={clock.label}
                onChange={(value) => send(actionChangeLabel(clock, value))}
              />
              <button type="button" onClick={() => send(actionMark(clock))}>
                +
              </button>
              <button type="button" onClick={() => send(actionUnmark(clock))}>
                -
              </button>
            </li>
          ),
          clocks
        )}
      </ul>
    </div>
  );
};

export default GMView;
