import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export const getAdvisory = async (payload) => {
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
