// In-memory API key store (simple example)
export const apiKeys = new Map([
    [
        "weather_dev_123",
        {
            owner: "local-dev",
            active: true,
        },
    ],
]);

// Lookup helper (single responsibility)
export const getApiKey = (key) => {
    return apiKeys.get(key);
}