import { useState } from "react";

// const API_BASE_URL = "https://weather-api-backend.onrender.com";
const API_BASE_URL = "https://weather-api-backend-hk5u.onrender.com";
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
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 shadow-xl rounded p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
          Weather API Dashboard
        </h1>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <input
            type="text"
            placeholder="City (e.g. London)"
            className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>

          <button
            onClick={fetchWeather}
            disabled={!city || loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto transition-colors"
          >
            {loading ? "Loading..." : "Fetch"}
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className="text-sm text-gray-300 mb-2">
            HTTP Status: {status}
          </div>
        )}

        {/* Output */}
        <pre className="bg-gray-950 border border-gray-700 rounded p-3 sm:p-4 text-xs sm:text-sm overflow-auto min-h-[200px] max-h-[400px] text-gray-100">
          {response && JSON.stringify(response, null, 2)}
          {error && JSON.stringify(error, null, 2)}
        </pre>

        {/* Notes */}
        <div className="mt-4 text-xs text-gray-400 space-y-1">
          <p>• API Key sent via header</p>
          <p>• Cached responses will show <code className="bg-gray-700 px-1 rounded">"cached": true</code></p>
          <p>• Rate limit triggers after 10 requests/min</p>
        </div>
      </div>
    </div>
  );
}

export default App;