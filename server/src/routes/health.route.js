import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        status: "okayish",
        uptime: process.uptime(),
        message: "Health check passed",
        timestamp: new Date().toISOString(),
    });
});

export default router;