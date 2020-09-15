import { filter, mergeMap } from "rxjs/operators";

const matchAction = (actionType) => {
  return (input$) =>
    input$.pipe(
      filter(({ action }) => action === actionType),
      mergeMap(({ payload }) => payload)
    );
};

export default matchAction;
