// package
import React from "react";
import ReactDOM from "react-dom/client";

// css
import "./index.css";
import "./App.css";
import "./ComponentChat/Chat.css";
import "./ComponentHome/Home.css";

// App
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
