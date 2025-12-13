import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sprout,
  BarChart3,
  CloudSun
} from "lucide-react";

const linkClass =
  "flex items-center gap-3 px-4 py-2 rounded-lg transition";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen p-6 hidden md:block">
      <h1 className="text-xl font-bold mb-10">🌾 SFAS</h1>

      <nav className="space-y-2 text-sm">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-green-700 font-semibold"
                : "opacity-80 hover:opacity-100"
            }`
          }
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/crops"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-green-700 font-semibold"
                : "opacity-80 hover:opacity-100"
            }`
          }
        >
          <Sprout size={18} />
          <span>Crops</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-green-700 font-semibold"
                : "opacity-80 hover:opacity-100"
            }`
          }
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/weather"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? "bg-green-700 font-semibold"
                : "opacity-80 hover:opacity-100"
            }`
          }
        >
          <CloudSun size={18} />
          <span>Weather</span>
        </NavLink>

      </nav>
    </aside>
  );
}


