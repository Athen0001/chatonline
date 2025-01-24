import rateLimit from "express-rate-limit";

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many signup attempts. Please try again in a hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

export default signupLimiter;
