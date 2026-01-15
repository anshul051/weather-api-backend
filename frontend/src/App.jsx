import { useState } from "react";

const API_BASE_URL = "http://localhost:5000";
const API_KEY = "weather_dev_123";

function App() {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatus(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/v1/weather/current?city=${city}&units=${units}`,
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      setStatus(res.status);
      const data = await res.json();

      if (!res.ok) {
        setError(data);
        return;
      }

      setResponse(data);
    } catch (err) {
      setError({ message: "Network error or server unreachable" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-6">
          Weather API Dashboard
        </h1>

        {/* Inputs */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="City (e.g. London)"
            className="border p-2 rounded w-full"
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
            onClick={fetchWeather}
            disabled={!city || loading}
            className="bg-black text-white px-4 rounded disabled:opacity-50"
          >
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className="text-sm text-gray-600 mb-2">
            HTTP Status: {status}
          </div>
        )}

        {/* Output */}
        <pre className="bg-gray-50 border rounded p-4 text-sm overflow-auto min-h-[200px]">
          {response && JSON.stringify(response, null, 2)}
          {error && JSON.stringify(error, null, 2)}
        </pre>

        {/* Notes */}
        <div className="mt-4 text-xs text-gray-500">
          <p>• API Key sent via header</p>
          <p>• Cached responses will show <code>"cached": true</code></p>
          <p>• Rate limit triggers after 10 requests/min</p>
        </div>
      </div>
    </div>
  );
}

export default App;