import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

/* ================= ADVISORY ================= */
export const getAdvisory = async (form) => {
  const res = await axios.post(
    `${BASE_URL}/api/advisory`,
    form,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

/* ================= WEATHER ================= */
export const getWeather = async () => {
  // Temporary mock data
  return Promise.resolve({
    temperature: 28,
    humidity: 65,
    rainfall: "Moderate",
    condition: "Cloudy",
  });
};
