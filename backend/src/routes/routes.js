import express from "express";
import { signup, login } from "../controllers/authController.js";
import authenticate from "../middlewares/authMiddleware.js";
import loginLimiter from "../middlewares/loginLimiter.js";
import signupLimiter from "../middlewares/signupLimiter.js";

const router = express.Router();

//signup
router.get("/api/signup", (req, res) => {
  res.status(200).json({ message: "signup route avaible." });
});
router.post("/api/signup", signupLimiter, signup);

//login
router.get("/api/login", (req, res) => {
  res.status(200).json({ message: "login route avaible." });
});
router.post("/api/login", loginLimiter, login);

//chat
router.get("/api/chat", authenticate, (req, res) => {
  res.status(200).json({
    message: "authorized access.",
    user: req.user,
  });
});

export default router;
