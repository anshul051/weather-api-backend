export const getCurrentWeather = async ({ city, units }) => {
    // In a real implementation, this function would fetch data from a weather API.
    // Here, we return fake data for demonstration purposes.
    return {
        city,
        units,
        temperature: 30,
        condition: "clear",
        sources: "mockService"
    };
};