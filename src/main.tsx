import React, { useState } from "react";
import { HashRouter } from "react-router-dom";
import ReactDom from "react-dom/client";
import App from "./App";
import "@src/mock";

const root = ReactDom.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
