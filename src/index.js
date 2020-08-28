import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import ClockProvider from "./context/clocks";
import DebugProvider from "./hooks/debug";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <DebugProvider>
      <ClockProvider>
        <App />
      </ClockProvider>
    </DebugProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
