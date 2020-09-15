import React, { useRef } from "react";
import Context from "./WebsocketContext";
import initialize from "./initialize";

const WebsocketProvider = (props) => {
  const value = useRef();

  if (!value.current) {
    value.current = initialize();
  }

  return <Context.Provider {...props} value={value.current} />;
};

export default WebsocketProvider;
