import { useState } from "react";
import { getAdvisory } from "../services/api";

export default function AdvisoryForm({ setResult, setLocation }) {

  const [form, setForm] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    ph: "",
    location: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await getAdvisory({
      nitrogen: Number(form.nitrogen),
      phosphorus: Number(form.phosphorus),
      potassium: Number(form.potassium),
      temperature: Number(form.temperature),
      humidity: Number(form.humidity),
      rainfall: Number(form.rainfall),
      ph: Number(form.ph),
    });

    setResult(data);
    setLocation(form.location);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
      <h2 className="text-base font-semibold mb-4">
        🌱 ML Crop Advisory Input
      </h2>

      <form onSubmit={submitHandler} className="grid grid-cols-2 gap-3">

        <input type="number" placeholder="Nitrogen (N)"
          value={form.nitrogen}
          onChange={e => setForm({ ...form, nitrogen: e.target.value })}
          required />

        <input type="number" placeholder="Phosphorus (P)"
          value={form.phosphorus}
          onChange={e => setForm({ ...form, phosphorus: e.target.value })}
          required />

        <input type="number" placeholder="Potassium (K)"
          value={form.potassium}
          onChange={e => setForm({ ...form, potassium: e.target.value })}
          required />

        <input type="number" placeholder="Temperature (°C)"
          value={form.temperature}
          onChange={e => setForm({ ...form, temperature: e.target.value })}
          required />

        <input type="number" placeholder="Humidity (%)"
          value={form.humidity}
          onChange={e => setForm({ ...form, humidity: e.target.value })}
          required />

        <input type="number" placeholder="Rainfall (mm)"
          value={form.rainfall}
          onChange={e => setForm({ ...form, rainfall: e.target.value })}
          required />

        <input type="number" step="0.1" placeholder="Soil pH"
          value={form.ph}
          onChange={e => setForm({ ...form, ph: e.target.value })}
          required />

        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 rounded-lg"
        >
          Get ML Advisory
        </button>

      </form>
    </div>
  );
}
