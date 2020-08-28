import { isObject } from "lodash";
import { slice, uniqueId, map } from "lodash/fp";
import React, { useState, useContext, useEffect } from "react";
import initial from "../clocks.example";

const Context = React.createContext();

const initialize = (clock) => ({
  id: uniqueId(),
  ...clock,
});

const useClockState = () => {
  const [clocks, setClocks] = useState(map(initialize, initial));

  const addClock = (text) => {
    setClocks((clocks) => {
      const newClock = initialize(isObject(text) ? text : { text });

      return [...clocks, newClock];
    });
  };

  const removeClock = (index) => {
    setClocks((clocks) => {
      return [
        ...slice(0, index, clocks),
        ...slice(index + 1, clocks.length, clocks),
      ];
    });
  };

  return { clocks, addClock, removeClock };
};

export const useClocks = () => useContext(Context);

const Provider = (props) => {
  const value = useClockState();
  useEffect(() => console.log(value), [value]);
  return <Context.Provider {...props} value={value} />;
};

export default Provider;
