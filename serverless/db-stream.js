/* eslint-disable no-console */
import makeWebsockets from "./src/websockets";

const AWS = require("aws-sdk");

const makeConnectionStore = require("./src/connectionStore");
const db = require("./src/dynamodb");

const connectionStore = makeConnectionStore(db);
const websockets = makeWebsockets(connectionStore);

const unmarshall = (records) => {
  return records.map((record) => {
    return AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
  });
};

export const handlerx = async (event) => {
  console.log(event);

  const newConnections = unmarshall(event.Records);
  websockets.broadcast({ newConnections });

  return { statusCode: 200 };
};

export default handlerx;
