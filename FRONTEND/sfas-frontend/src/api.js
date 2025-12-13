const API = import.meta.env.VITE_BACKEND_URL;

export const getAnalytics = async () => {
  const res = await fetch(`${API}/api/analytics`);
  return res.json();
};
