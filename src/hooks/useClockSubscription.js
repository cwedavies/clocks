import { values } from "lodash/fp";
import { useObservable, useObservableState } from "observable-hooks";
import { useEffect } from "react";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { useWebsocket } from "../context/Websocket";
import indexFromChanges from "../stream/indexFromChanges";
import matchAction from "../stream/matchAction";

const useClockSubscription = () => {
  const { actions$, send } = useWebsocket();

  const clocks$ = useObservable(
    (input$) =>
      input$.pipe(
        switchMap(([actions$]) => actions$),
        matchAction("clock/changes"),
        indexFromChanges(),
        debounceTime(20),
        map(values)
      ),
    [actions$]
  );

  useEffect(() => {
    send({ action: "clock/subscription/request" });
  }, [send]);

  return useObservableState(clocks$, {});
};

export default useClockSubscription;
