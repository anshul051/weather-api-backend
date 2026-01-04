import { Router } from "express";

const router = Router();

router.get("/current", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "weather route works"
    });
});

export default router;