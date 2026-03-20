import { redisClient } from "../config/redis.js";
import { fetchCurrentWeather } from "../providers/weather.provider.js";
import { metrics } from "../utils/metrics.js";

const TTL_SECONDS = 300; // 5 minutes

/* 
export const getCurrentWeather = async ({ city, units }) => {
    const key = `weather:current:${city}:${units}`;


// In a real implementation, this function would fetch data from a weather API.
    // Here, we return fake data for demonstration purposes.
    return {
        city,
        units,
        temperature: 30,
        condition: "clear",
        sources: "mockService"
    };


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
*/

export const getCurrentWeather = async ({ city, units }) => {
  const key = `weather:current:${city}:${units}`;
  
  metrics.totalRequests++; // Track total requests

  // 1. Try cache read (gracefully handle errors)
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      metrics.cacheHits++; // Track cache hit
      const hitRate = ((metrics.cacheHits / metrics.totalRequests) * 100).toFixed(1);
      console.log(`✅ Cache HIT for ${city} - Hit rate: ${hitRate}%`);
      
      return {
        ...JSON.parse(cached),
        cached: true,
      };
    }
  } catch (err) {
    console.error("Redis GET failed, bypassing cache: ", err.message);
  }

  metrics.cacheMisses++; // Track cache miss
  const hitRate = ((metrics.cacheHits / metrics.totalRequests) * 100).toFixed(1);
  console.log(`❌ Cache MISS for ${city} - Hit rate: ${hitRate}%`);

  // 2. fetch from provider (REAL DATA NOW)
  const data = await fetchCurrentWeather({ city, units });  

  // 3. Try cache write (gracefully handle errors)
  try {
    await redisClient.set(key, JSON.stringify(data), {
      EX: TTL_SECONDS,
    });
  } catch (err) {
    console.error("Redis SET failed, continuing without cache: ", err.message);
  }

  return {
    ...data,
    cached: false,
  };
};