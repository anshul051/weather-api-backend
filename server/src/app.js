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
      "http://localhost:5174", // Add this - Vite's alternate port
      "http://localhost:3000",  // Add this - common React port
      "https://weather-api-frontend.onrender.com",
      "https://weather-api-frontend-plum.vercel.app", // If deployed on Vercel
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key"],
    credentials: true, // Add this if you need cookies/auth
  })
);

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/v1/weather", weatherRouter);

app.use(notFound);
app.use(errorHandler);

export default app;