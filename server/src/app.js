import express from "express";
import healthRouter from "./routes/health.route.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import weatherRouter from "./routes/weather.route.js";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/v1/weather", weatherRouter);

app.use(notFound);
app.use(errorHandler);

export default app;