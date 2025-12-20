import { useEffect, useState } from "react";
import { getWeather } from "../services/api";

export default function Weather({ location, onWeatherData }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    setError(null);

    getWeather(location)
      .then((data) => {
        setWeather(data);

        // 🔹 Send weather data to parent (for ML auto-fill)
        if (onWeatherData) {
          onWeatherData(data);
        }
      })
      .catch((err) => {
        console.error("Weather error:", err);
        setError("Failed to load weather data");
      })
      .finally(() => setLoading(false));
  }, [location, onWeatherData]);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <p className="text-gray-500 animate-pulse">
          Loading weather data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  /* ---------- UI ---------- */

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
        🌦 Weather Overview ({location})
      </h2>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <p>🌡 Temperature: <b>{weather.temp}°C</b></p>
        <p>💧 Humidity: <b>{weather.humidity}%</b></p>
        <p>🌧 Rainfall: <b>{weather.rainfall} mm</b></p>
        {weather.condition && (
          <p>☁ Condition: <b>{weather.condition}</b></p>
        )}
      </div>
    </div>
  );
}
