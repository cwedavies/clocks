/* eslint-disable no-console */
import makeConnectionStore from "./src/connectionStore";
import db, { unmarshallStream } from "./src/dynamodb";
import makeWebsockets from "./src/websockets";

const connectionStore = makeConnectionStore(db);
const websockets = makeWebsockets(connectionStore);

export const handler = async (event) => {
  unmarshallStream(event.Records).forEach((change) => {
    websockets.broadcast({
      action: "clock/change",
      payload: change,
    });
  });

  return { statusCode: 200 };
};

export default handler;
