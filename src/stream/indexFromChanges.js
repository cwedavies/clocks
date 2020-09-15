const { update } = require("lodash/fp");
const { scan } = require("rxjs/operators");

const accumulate = (acc, { newValue }) =>
  update([newValue.id], (prev) => ({ ...prev, ...newValue }), acc);

const indexFromChanges = () => {
  return (changes$) => changes$.pipe(scan(accumulate, {}));
};

export default indexFromChanges;
