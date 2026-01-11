import { redisClient } from "../config/redis.js";

const WINDOW_SECONDS = 60;   // 1 minute
const MAX_REQUESTS = 10;     // max 10 requests per window

export const rateLimitMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return next();

  // fixed window key
  const window = Math.floor(Date.now() / (WINDOW_SECONDS * 1000));
  const redisKey = `rate:${apiKey}:${window}`;

  try {
    const currentCount = await redisClient.incr(redisKey);

    if (currentCount === 1) {
      await redisClient.expire(redisKey, WINDOW_SECONDS);
    }

    if (currentCount > MAX_REQUESTS) {
      return res.status(429).json({
        status: "error",
        message: "Rate limit exceeded. Try again later.",
      });
    }
  } catch (err) {
    console.error("Rate limit Redis error:", err.message);
    // fail open
  }

  next();
};