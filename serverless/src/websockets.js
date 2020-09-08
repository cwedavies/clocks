// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

const isOffline = process.env.IS_OFFLINE;

const gateway = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  ...(isOffline && { endpoint: "http://localhost:3001" }),
});

const makeWebsockets = (connectionStore) => {
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

      await connectionStore.remove(connection);
      return null;
    }
  };

  const broadcast = async (data) => {
    const connections = await connectionStore.list();
    return Promise.all(connections.map((id) => send(id, data)));
  };

  return {
    send,
    broadcast,
  };
};

module.exports = makeWebsockets;
