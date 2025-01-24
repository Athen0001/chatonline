import rateLimit from "express-rate-limit";

const applyRateLimiting = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP. Please try again later.",
  });

  app.use(limiter);
};

export default applyRateLimiting;
