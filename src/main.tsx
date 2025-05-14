import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "./store/store";
import { RootCmp } from "./RootCmp";

// import "./assets/styles/main.css";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) throw new Error("Root element not found");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
);
