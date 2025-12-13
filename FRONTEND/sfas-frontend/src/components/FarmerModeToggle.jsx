import { useFarmerMode } from "../context/useFarmerMode";

export default function FarmerModeToggle() {
  const { mode, setMode } = useFarmerMode();

  return (
    <button
      onClick={() =>
        setMode(mode === "basic" ? "advanced" : "basic")
      }
      className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
    >
      Mode: {mode === "basic" ? "Basic Farmer" : "Advanced Farmer"}
    </button>
  );
}

