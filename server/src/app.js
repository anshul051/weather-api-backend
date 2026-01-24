import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.route.js";
import weatherRouter from "./routes/weather.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

// CORS configuration - must be before routes
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

// Body parser middleware
app.use(express.json());

// Routes
app.use("/health", healthRouter);
app.use("/api/v1/weather", weatherRouter);

// Error handling middleware - must be last
app.use(notFound);
app.use(errorHandler);

export default app;