// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // mantém o import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="h-screen">
      {" "}
      {/* 100% da viewport */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
