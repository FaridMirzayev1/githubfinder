// Suppress missing type declarations if the package's types aren't installed
// @ts-ignore: Could not find module 'react-router-dom' or its type declarations
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
