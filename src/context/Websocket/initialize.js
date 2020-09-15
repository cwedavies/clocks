import { merge, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

const initialize = () => {
  const open$ = new Subject();
  const close$ = new Subject();

  const websocket$ = webSocket({
    url: "wss://r6m649gqqj.execute-api.us-east-1.amazonaws.com/dev",
    closeObserver: close$,
    openObserver: open$,
  });

  const send = (value) => websocket$.next(value);

  const actions$ = merge(
    websocket$,
    open$.pipe(map(() => ({ action: "$open" }))),
    close$.pipe(map(() => ({ action: "$close" })))
  );

  return {
    actions$,
    send,
  };
};

export default initialize;
