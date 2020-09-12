import makeStore from "./makeStore";

const makeSubscriptionStore = (ddb) => makeStore("connections", ddb);

export default makeSubscriptionStore;
