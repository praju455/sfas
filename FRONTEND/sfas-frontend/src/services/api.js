import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

// 🔎 Safety check (helps during deploy debugging)
if (!API) {
  console.error("❌ VITE_BACKEND_URL is not defined");
}

/* ================== ANALYTICS ================== */
// type = "daily" | "weekly" | "monthly"
export const getAnalytics = async (type = "daily") => {
  let url = `${API}/api/analytics`;

  if (type === "weekly") {
    url = `${API}/api/analytics/weekly`;
  } else if (type === "monthly") {
    url = `${API}/api/analytics/monthly`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
};

/* ================== CSV EXPORT ================== */
export const exportAnalyticsCSV = () => {
  if (!API) {
    alert("Backend URL not configured");
    return;
  }

  // Opens CSV download in new tab
  window.open(`${API}/api/analytics/export`, "_blank");
};

/* ================== WEATHER ================== */
export const getWeather = async (location) => {
  if (!location) {
    throw new Error("Location is required");
  }

  const res = await fetch(`${API}/api/weather/${location}`);

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  return res.json();
};

/* ================== ADVISORY ================== */
export const getAdvisory = async (payload) => {
  if (!payload) {
    throw new Error("Payload is required");
  }

  const res = await axios.post(
    `${API}/api/advisory`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
