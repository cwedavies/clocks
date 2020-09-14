const makeSubscriptions = (gateway, subscriberStore, clockStore) => {
  const send = (connection, changes) =>
    gateway.send(connection, {
      type: "clock/changes",
      payload: changes,
    });

  const broadcast = async (changes) => {
    const subscribers = await subscriberStore.list();
    return Promise.all(subscribers.map(async ({ id }) => {
      try {
        return await send(id, changes)
      } catch (err) {
        if (err.statusCode !== 410) {
          console.error(err)
          return null;
        }
        return subscriberStore.remove(id);
      }
    }));
  };

  const subscribe = async (connection) => {
    await subscriberStore.put({ id: connection });

    const clocks = await clockStore.list();
    await send(
      connection,
      clocks.map((clock) => ({ oldValue: null, newValue: clock }))
    );

    return connection;
  };

  return {
    send,
    broadcast,
    subscribe,
  };
};

export default makeSubscriptions;
