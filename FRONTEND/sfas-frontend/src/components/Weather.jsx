import { useEffect, useState } from "react";
import axios from "axios";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/weather")
      .then(res => setWeather(res.data));
  }, []);

  if (!weather) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Weather Overview
      </h2>

      <p>🌡 Temperature: {weather.temp}°C</p>
      <p>🌧 Rainfall: {weather.rainfall}</p>
      <p>💧 Humidity: {weather.humidity}%</p>
    </div>
  );
}

