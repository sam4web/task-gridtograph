import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import config from "@/config";
import App from "./App.tsx";
import "./index.css";

if (config.VITE_ENV === "production") {
  disableReactDevTools();
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
