/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";

export const FarmerModeContext = createContext();

export function FarmerModeProvider({ children }) {
  const [mode, setMode] = useState("basic");

  return (
    <FarmerModeContext.Provider value={{ mode, setMode }}>
      {children}
    </FarmerModeContext.Provider>
  );
}
