import dynamodb from "./aws/dynamodb";
import gateway from "./aws/gateway";
import makeSubscriptions from "./makeSubscriptions";
import { makeSubscriptionStore, makeClockStore } from "./store";

const subscriptionStore = makeSubscriptionStore(dynamodb);
const clockStore = makeClockStore(dynamodb);
const subscriptions = makeSubscriptions(gateway, subscriptionStore, clockStore);

const handleSubscriptionRequest = async (event) => {
  const { requestContext } = event;
  const { connectionId } = requestContext;

  await subscriptions.subscribe(connectionId);
};

const handleChangeRequest = async (event) => {
  const { body } = event;
  await clockStore.put(JSON.parse(body).payload);
};

export const handler = async (event) => {
  const { requestContext, body } = event;
  const { routeKey, connectionId } = requestContext;

  console.log(`${connectionId} ${routeKey}: ${body}`);

  switch (routeKey) {
    case "clock/subscription/request":
      await handleSubscriptionRequest(event);
      break;
    case "clock/change/request":
      await handleChangeRequest(event);
      break;
    default:
  }

  return { statusCode: 200 };
};

export default handler;
