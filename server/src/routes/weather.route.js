import { Router } from "express";
import { getCurrentWeather } from "../controllers/weather.controller.js";

const router = Router();

/*
router.get("/current", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "weather route works"
    });
});
*/

router.get("/current", getCurrentWeather);

export default router;