/* eslint-disable no-console */
const AWS = require("aws-sdk");

const makeConnectionStore = require("./src/connectionStore");
const db = require("./src/dynamodb");
const makeWebsockets = require("./src/websockets");

const connectionStore = makeConnectionStore(db);
const websockets = makeWebsockets(connectionStore);

const unmarshall = (records) => {
  return records.map((record) => {
    return AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
  });
};

exports.handlerx = async (event) => {
  console.log(event);

  const newConnections = unmarshall(event.Records);
  websockets.broadcast({ newConnections });

  return { statusCode: 200 };
};
