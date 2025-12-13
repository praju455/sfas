import { useState } from "react";
import { FarmerModeContext } from "./FarmerModeContext";

export function FarmerModeProvider({ children }) {
  const [mode, setMode] = useState("basic");

  return (
    <FarmerModeContext.Provider value={{ mode, setMode }}>
      {children}
    </FarmerModeContext.Provider>
  );
}
