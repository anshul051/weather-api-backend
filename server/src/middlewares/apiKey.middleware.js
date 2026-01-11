import { getApiKey } from "../config/apiKeys.js";

export const apiKeyMiddleware = (req,res,next) => {
    //1. Read API key from header
    const apiKey = req.headers["x-api-key"];

    //2. If missing -> unathenticated
    if (!apiKey) {
        return res.status(401).json({
            status: "error",
            message: "API key is missing",
        });
    }

    //3. Look up the API key in Store
    const keyRecord = getApiKey(apiKey);

    //4. If key not found or inactive -> unathenticated
    if (!keyRecord || !keyRecord.active) {
        return res.status(401).json({
            status: "error",
            message: "Invalid or inactive API key",
        });
    }

    //5. Attach key info to request (for later use)
    req.apiKey = keyRecord;

    //6. Allow request to continue
    next();
};