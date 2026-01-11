import { Router } from "express";
import { apiKeyMiddleware } from "../middlewares/apiKey.middleware.js";
import { rateLimitMiddleware } from "../middlewares/rateLimit.middleware.js";
import { getCurrentWeatherController } from "../controllers/weather.controller.js";

const router = Router();

/*
router.get("/current", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "weather route works"
    });
});
*/

// Apply API key middleware to all weather routes
router.get("/current", apiKeyMiddleware, rateLimitMiddleware, getCurrentWeatherController);

export default router;