// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from "aws-sdk";

const isOffline = process.env.IS_OFFLINE;

export const gateway = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  ...(isOffline && { endpoint: "http://localhost:3001" }),
});

export const send = async (connection, data) => {
  return gateway
    .postToConnection({
      ConnectionId: connection,
      Data: JSON.stringify(data),
    })
    .promise();
};
