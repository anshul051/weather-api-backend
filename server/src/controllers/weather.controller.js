import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const getCurrentWeather = (req, res, next) => {
    const { city, units } = req.query;

    //basic sanity check
    if (!city || city.trim() === "") {
        return next(
            new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "City query parameter is required"
            )
        );
    }

    //fake data for now (service comes next)
    const data = {
        city: "delhi",
        units: units || "metric",
        temperature: 30,
        condition: "clear",
    };

    res.status(200).json({
        status: "success",
        data,
        timestamp: new Date().toISOString(),
    });
};