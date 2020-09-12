import makeStore from "./makeStore";

const makeClockStore = (ddb) => makeStore("clocks", ddb);

export default makeClockStore;
