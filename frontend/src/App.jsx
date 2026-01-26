import { useState } from "react";

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && city) {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-white">
          Weather API Dashboard
        </h1>

        {/* Input Card */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter city"
              className="bg-gray-700 text-white placeholder-gray-500 p-2.5 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-600"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <select
              className="bg-gray-700 text-white p-2.5 rounded w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-gray-600"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            >
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>

            <button
              onClick={fetchWeather}
              disabled={!city || loading}
              className="bg-blue-800 hover:bg-blue-700 text-white px-5 py-2.5 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto cursor-pointer"
            >
              {loading ? "Loading..." : "Fetch"}
            </button>
          </div>
        </div>

        {/* Response Card */}
        {(response || error) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            {status && (
              <div className="text-sm text-gray-400 mb-4">
                Status: {status}
              </div>
            )}

            {response && response.status === "success" && (
              <div className="space-y-6">
                {/* Weather Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div>
                    <h2 className="text-2xl font-medium text-white">
                      {response.data.city}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(response.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {response.data.cached && (
                    <span className="text-gray-500 text-xs">
                      Cached
                    </span>
                  )}
                </div>

                {/* Weather Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Temperature</span>
                    <span className="text-2xl font-medium text-white">
                      {response.data.temperature}°{units === 'metric' ? 'C' : 'F'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Condition</span>
                    <span className="text-white">
                      {response.data.condition}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Source</span>
                    <span className="text-white capitalize">
                      {response.data.source}
                    </span>
                  </div>
                </div>

                {/* Raw JSON Toggle */}
                <details className="pt-4 border-t border-gray-700">
                  <summary className="text-gray-400 cursor-pointer hover:text-gray-300 text-sm">
                    View raw JSON
                  </summary>
                  <pre className="bg-gray-900 rounded p-4 text-xs overflow-auto max-h-[300px] text-gray-300 mt-3">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </details>
              </div>
            )}

            {error && (
              <div>
                <p className="text-red-400 mb-3">{error.message || "An error occurred"}</p>
                {error.error && (
                  <pre className="bg-gray-900 rounded p-4 text-xs overflow-auto max-h-[200px] text-gray-300">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="space-y-2 text-sm text-gray-400">
            <p>• API key sent via header</p>
            <p>• Cached responses show "cached": true</p>
            <p>• Rate limit: 10 requests/min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;