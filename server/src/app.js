import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.route.js";
import weatherRouter from "./routes/weather.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://weather-api-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-api-key"],
  })
);

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/v1/weather", weatherRouter);

app.use(notFound);
app.use(errorHandler);

export default app;