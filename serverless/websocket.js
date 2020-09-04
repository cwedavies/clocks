/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

const gateway = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  endpoint: "http://localhost:3001",
});

const db = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "localhost",
  endpoint: "http://localhost:8000",
});

const saveConnection = async (id) => {
  const params = {
    TableName: "connections",
    Item: {
      id,
    },
  };

  return db.put(params).promise();
};

const removeConnection = async (id) => {
  console.log(`removing connection ${id}`);
  return db
    .delete({
      TableName: "connections",
      Key: {
        id,
      },
    })
    .promise();
};

const fetchConnections = async () => {
  const results = await db
    .scan({
      TableName: "connections",
    })
    .promise();

  return results.Items.map((item) => item.id);
};

const send = async (connection, data) => {
  try {
    return await gateway
      .postToConnection({
        ConnectionId: connection,
        Data: JSON.stringify(data),
      })
      .promise();
  } catch (err) {
    if (err.statusCode !== 410) {
      throw err;
    }

    await removeConnection(connection);
    return null;
  }
};

const broadcast = async (data) => {
  const connections = await fetchConnections();
  return Promise.all(connections.map((id) => send(id, data)));
};

exports.handler = async (event) => {
  const { requestContext, body } = event;
  const { routeKey, connectionId } = requestContext;

  console.log({ routeKey, connectionId, body });

  switch (routeKey) {
    case "$connect":
      await saveConnection(connectionId);
      break;
    case "$default":
      await broadcast({ connectionId, body });
      break;
    default:
  }

  return { statusCode: 200 };
};
