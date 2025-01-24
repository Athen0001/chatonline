import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import applySecurityMiddlewares from "./middlewares/security.js";
import applyRateLimiting from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_API,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

applySecurityMiddlewares(app);
applyRateLimiting(app);

app.use(router);

export default app;
