// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // mantém o import

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="h-screen">
      {" "}
      {/* 100% da viewport */}
      <App />
    </div>
  </React.StrictMode>
);
