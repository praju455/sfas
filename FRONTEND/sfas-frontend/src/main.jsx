import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";          // ✅ THIS IS CRITICAL
import "./i18n/i18n";
import { FarmerModeProvider } from "./context/FarmerModeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FarmerModeProvider>
      <App />
    </FarmerModeProvider>
  </React.StrictMode>
);
