import { getCurrentWeather } from "../services/weather.services.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

/*
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
*/

export const getCurrentWeatherController = async (req, res, next) => {
    try {
        const { city, units } = req.query;

        if(!city || city.trim() === "") {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "City query parameter is required"
            );
        }

        const weather = await getCurrentWeather({
            city,
            units: units || "metric",
        });

        res.status(200).json({
            status: "success",
            data: weather,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
};