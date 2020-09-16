import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WebsocketProvider from "./context/Websocket";
import GMView from "./pages/GMView";
import PlayerView from "./pages/PlayerView/PlayerView";

const App = () => {
  return (
    <WebsocketProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/gm">
            <GMView />
          </Route>
          <Route path="/">
            <PlayerView />
          </Route>
        </Switch>
      </BrowserRouter>
    </WebsocketProvider>
  );
};

export default App;
