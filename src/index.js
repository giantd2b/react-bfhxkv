import React from "react";
import ReactDOM from "react-dom";
import { LiffProvider } from "react-liff";

//import './index.css';
import App from "./App";

const liffId = "1655038597-qEd8MEr4";
const stubEnabled = process.env.NODE_ENV !== "production";

ReactDOM.render(
  <React.StrictMode>
    <LiffProvider liffId={liffId} stubEnabled={stubEnabled}>
      <App />
    </LiffProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
