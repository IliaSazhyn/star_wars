import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/main.css"
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
