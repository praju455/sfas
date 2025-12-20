import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getAnalytics } from "../services/api";

export default function Charts() {
  const [rawData, setRawData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [view, setView] = useState("bar");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then((res) => setRawData(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        Loading analytics...
      </div>
    );
  }

  /* ---------- FILTER ---------- */
  const crops = ["All", ...new Set(rawData.map(d => d.crop))];

  const filtered =
    selectedCrop === "All"
      ? rawData
      : rawData.filter(d => d.crop === selectedCrop);

  /* ---------- PIE DATA ---------- */
  const pieData = Object.values(
    filtered.reduce((acc, cur) => {
      acc[cur.crop] = acc[cur.crop] || { crop: cur.crop, count: 0 };
      acc[cur.crop].count += cur.count;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        📊 Date-wise Advisory Analytics
      </h2>

      {/* CONTROLS */}
      <div className="flex gap-3 mb-4 items-center">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          {crops.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button onClick={() => setView("bar")}>Bar</button>
        <button onClick={() => setView("pie")}>Pie</button>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        {view === "bar" ? (
          <BarChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#16a34a" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={pieData}
              dataKey="count"
              nameKey="crop"
              outerRadius={90}
              label
            >
              {pieData.map((_, i) => (
                <Cell
                  key={i}
                  fill={["#16a34a", "#22c55e", "#4ade80"][i % 3]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

