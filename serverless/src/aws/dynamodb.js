// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from "aws-sdk";

const isOffline = process.env.IS_OFFLINE;

const offlineConfig = {
  region: "localhost",
  endpoint: "http://dynamodb:8000",
};

export const database = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  ...(isOffline && offlineConfig),
});

export const { unmarshall } = AWS.DynamoDB.Converter;

export const unmarshallStream = (records) => {
  return records.map((record) => {
    return {
      oldValue: unmarshall(record.dynamodb.OldImage),
      newValue: unmarshall(record.dynamodb.NewImage),
    };
  });
};

export default database;
