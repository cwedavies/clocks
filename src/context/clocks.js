import { values } from "lodash/fp";
import {
  useObservableState,
  useObservable,
  useSubscription,
} from "observable-hooks";
import React, { useContext } from "react";
import { Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import clocksFromActions from "../stream/clocks";

const Context = React.createContext();

export const useClocks = () => useContext(Context);

const open$ = new Subject();

const websocket$ = webSocket({
  url: "wss://r6m649gqqj.execute-api.us-east-1.amazonaws.com/dev",
  closeObserver: {
    next: () => console.log("close"),
  },
  openObserver: open$,
});

const Provider = (props) => {
  const clocks$ = useObservable(() => websocket$.pipe(clocksFromActions));
  const clocks = values(useObservableState(clocks$, {}));

  useSubscription(open$, () =>
    websocket$.next({ action: "clock/subscription/request" })
  );

  return <Context.Provider {...props} value={{ clocks }} />;
};

export default Provider;
