import React, { useContext, useState } from "react";

const getBoolParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

const Context = React.createContext();

export const Provider = (props) => {
  const [debug, setDebug] = useState(() => {
    const queryState = getBoolParam("debug");

    return queryState || false;
  });
  const toggleDebug = () => setDebug((val) => !val);

  return (
    <Context.Provider
      {...props}
      value={{
        debug,
        setDebug,
        toggleDebug,
      }}
    />
  );
};

export default Provider;

export const useDebug = () => useContext(Context);
