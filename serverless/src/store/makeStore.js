const makeStore = (tableName, ddb) => {
  const put = async (item) => {
    return ddb
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();
  };

  const list = async () => {
    return ddb
      .scan({ TableName: tableName })
      .promise()
      .then((res) => res.Items);
  };

  const remove = async (id) => {
    return ddb
      .delete({
        TableName: tableName,
        Key: { id },
      })
      .promise();
  };

  return { put, list, remove };
};

export default makeStore;
