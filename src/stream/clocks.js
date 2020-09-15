import { filter, mergeMap } from "rxjs/operators";
import indexFromChanges from "./indexFromChanges";

const ACTION_TYPE = "clock/changes";

const filterMessages = () => filter(({ action }) => action === ACTION_TYPE);

const flattenPayload = () => mergeMap(({ payload }) => payload);

const clocks = (messages$) =>
  messages$.pipe(filterMessages(), flattenPayload(), indexFromChanges());

export default clocks;
