import { useContext } from "react";
import { FarmerModeContext } from "./FarmerModeContext";

export function useFarmerMode() {
  const context = useContext(FarmerModeContext);

  if (!context) {
    throw new Error("useFarmerMode must be used inside FarmerModeProvider");
  }

  return context;
}
