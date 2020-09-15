import { values } from "lodash/fp";
import { useObservable, useObservableState } from "observable-hooks";
import { useEffect } from "react";
import { switchMap } from "rxjs/operators";
import indexFromChanges from "../stream/indexFromChanges";
import matchAction from "../stream/matchAction";

const useClockSubscription = (websocket$) => {
  const clocks$ = useObservable(
    (input$) =>
      input$.pipe(
        switchMap(([websocket$]) => websocket$),
        matchAction("clock/changes"),
        indexFromChanges()
      ),
    [websocket$]
  );

  useEffect(() => {
    websocket$.next({ action: "clock/subscription/request" });
  }, [websocket$]);

  return values(useObservableState(clocks$, {}));
};

export default useClockSubscription;
