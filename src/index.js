import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { stores } from "./stores";

ReactDOM.render(<App stores={stores} />, document.getElementById("root"));
