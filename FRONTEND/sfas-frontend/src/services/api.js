import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

// 🔎 Safety check (helps during deploy debugging)
if (!API) {
  console.error("VITE_BACKEND_URL is not defined");
}

/* ---------- Analytics ---------- */
export const getAnalytics = async () => {
  const res = await fetch(`${API}/api/analytics`);

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
};

/* ---------- Weather ---------- */
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

/* ---------- Advisory ---------- */
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
