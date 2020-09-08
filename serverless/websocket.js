/* eslint-disable no-console */

const makeConnectionStore = require("./src/connectionStore");
const db = require("./src/dynamodb");
const makeWebsockets = require("./src/websockets");

const connectionStore = makeConnectionStore(db);
const websockets = makeWebsockets(connectionStore);

exports.handler = async (event) => {
  const { requestContext, body } = event;
  const { routeKey, connectionId } = requestContext;

  switch (routeKey) {
    case "$connect":
      await connectionStore.add(connectionId);
      break;
    case "$default":
      await websockets.broadcast({ connectionId, body });
      break;
    default:
  }

  return { statusCode: 200 };
};
