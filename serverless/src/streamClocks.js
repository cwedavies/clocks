import dynamodb, { unmarshallStream } from "./aws/dynamodb";
import makeSubscriptions from "./makeSubscriptions";
import { makeSubscriptionStore, makeClockStore } from "./store";

const subscriptionStore = makeSubscriptionStore(dynamodb);
const clockStore = makeClockStore(dynamodb);

const subscriptions = makeSubscriptions(subscriptionStore, clockStore);

export const handler = async (event) => {
  await subscriptions.broadcast(unmarshallStream(event.Records));
  return { statusCode: 200 };
};

export default handler;
