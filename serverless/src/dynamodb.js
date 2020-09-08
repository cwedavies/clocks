// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

const isOffline = process.env.IS_OFFLINE;

const offlineConfig = {
  region: "localhost",
  endpoint: "http://localhost:8000",
};

module.exports = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  ...(isOffline && offlineConfig),
});
