import { useEffect, useState } from "react";
import { getWeather } from "./services/api";

export default function Weather({ location }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    getWeather(location)
      .then(setWeather)
      .catch((err) => {
        console.error(err);
        setError("Failed to load weather");
      });
  }, [location]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-3">
        Weather Overview ({location})
      </h2>

      <p>🌡 Temperature: {weather.temp}°C</p>
      <p>🌧 Rainfall: {weather.rainfall}</p>
      <p>💧 Humidity: {weather.humidity}%</p>
    </div>
  );
}
