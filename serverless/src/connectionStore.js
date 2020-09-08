const makeConnectionStore = (ddb) => {
  const add = async (id) => {
    console.log(`new connection ${id}`);
    const params = {
      TableName: "connections",
      Item: {
        id,
      },
    };

    return ddb.put(params).promise();
  };

  const remove = async (id) => {
    console.log(`removing connection ${id}`);
    return ddb
      .delete({
        TableName: "connections",
        Key: {
          id,
        },
      })
      .promise();
  };

  const list = async () => {
    const results = await ddb
      .scan({
        TableName: "connections",
      })
      .promise();

    return results.Items.map((item) => item.id);
  };

  return {
    add,
    remove,
    list,
  };
};

module.exports = makeConnectionStore;
