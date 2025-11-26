// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./utils/site"; // Initialize site utilities
import "./i18n"; // Initialize i18n
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
