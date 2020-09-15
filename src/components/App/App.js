import React from "react";
import WebsocketProvider from "../../context/Websocket";
import PlayerView from "../../pages/PlayerView/PlayerView";

const App = () => {
  return (
    <WebsocketProvider>
      <PlayerView />
    </WebsocketProvider>
  );
};

export default App;
