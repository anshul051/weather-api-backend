import { redisClient } from "../config/redis.js";

const TTL_SECONDS = 300; // 5 minutes

export const getCurrentWeather = async ({ city, units }) => {
    const key = `weather:current:${city}:${units}`;

/*
    // In a real implementation, this function would fetch data from a weather API.
    // Here, we return fake data for demonstration purposes.
    return {
        city,
        units,
        temperature: 30,
        condition: "clear",
        sources: "mockService"
    };
*/

    // 1 -> Check cache
    const cached = await redisClient.get(key);
    if(cached) {
        return {
            ...JSON.parse(cached),
            cached: true,
        };
    }

    // 2 -> compute (mock for now)
    const data = {
        city,
        units,
        temperature: 30,
        condition: "clear",
        source: "mockService",
    };

    // 3 -> Store in cache
    await redisClient.set(key, JSON.stringify(data), {
        EX: TTL_SECONDS,
    });

    return {
        ...data,
        cached: false,
    };
};