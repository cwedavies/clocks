// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from "aws-sdk";

const isOffline = process.env.IS_OFFLINE;

export const makeGateway = () => {
  const gateway = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: process.env.GATEWAY_ENDPOINT,
    ...(isOffline && { endpoint: "http://localhost:3001" }),
  });

  const send = async (connection, data) => {
    return gateway
      .postToConnection({
        ConnectionId: connection,
        Data: JSON.stringify(data),
      })
      .promise();
  };

  return {
    gateway,
    send,
  }
}

export default makeGateway();
