import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { stores } from "./stores";
import { Provider } from "mobx-react";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider stores={stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
