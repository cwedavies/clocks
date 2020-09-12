/* eslint-disable no-console */

import makeConnectionStore from "./src/connectionStore";
import db from "./src/dynamodb";

const connectionStore = makeConnectionStore(db);

const log = (x) => console.log(x) || x;

export const handler = async (event) => {
  const { requestContext, body } = event;
  const { routeKey, connectionId } = requestContext;

  console.log(`${connectionId} ${routeKey}: ${body}`);

  switch (routeKey) {
    case "$connect":
      await connectionStore.add(connectionId);
      break;
    case "clock/change/request":
      await db
        .put(
          log({
            TableName: "clocks",
            Item: JSON.parse(body).payload,
          })
        )
        .promise();
      break;
    default:
  }

  return { statusCode: 200 };
};

export default handler;
