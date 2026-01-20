import express from "express";
import healthRouter from "./routes/health.route.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import weatherRouter from "./routes/weather.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "https://weather-api-frontend.onrender.com"
    ],
  })
);

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/v1/weather", weatherRouter);

app.use(notFound);
app.use(errorHandler);

export default app;