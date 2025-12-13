import Weather from "../components/Weather";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Weather Information</h1>
      <Weather />
    </div>
  );
}
