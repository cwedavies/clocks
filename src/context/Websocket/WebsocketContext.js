import React from "react";
import { of } from "rxjs";

const Context = React.createContext({
  actions$: of(),
  send: () => {},
});

export default Context;
