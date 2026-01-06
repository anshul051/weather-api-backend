import { useState } from "react";
import type { WeatherResponse } from "./types/Weather";

function App() {
  const [city, setCity] = useState<string>("");
  const [units, setUnits] = useState<string>("metric");
  const [result, setResult] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Weather API Dashboard</h1>

      {/* inputs */}
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded w-48"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        >
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>

        <button
          className="bg-black text-white px-4 rounded cursor-pointer"
          onClick={async () => {
            setError(null);
            setResult(null);

            try {
              const res = await fetch(
                `http://localhost:4000/api/v1/weather/current?city=${city}&units=${units}`
              );

              setStatus(res.status);

              const data = await res.json();

              if (!res.ok) {
                setError(data);
                return;
              }

              setResult(data);
            } catch (err) {
              setError({ message: "Network error" });
            }
          }}
        >
          Fetch
        </button>
      </div>

      {/* status */}
      {status && (
        <div className="mb-2 text-sm text-gray-700">HTTP Status: {status}</div>
      )}

      {/* output */}
      <pre className="bg-white p-4 rounded text-sm overflow-auto">
        {result && JSON.stringify(result, null, 2)}
        {error && JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );
}

export default App;
