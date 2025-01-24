import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import redisClient from "../config/redis.js";
import { body, validationResult } from "express-validator";

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

export const signup = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long.")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { email, username, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "email already in use." }); //alert no front
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Sign up sucessfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "error creating user", error: error.message });
    }
  },
];

export const login = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(400)
          .json({ message: "There is no user with this e-mail." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const token = generateToken(user.id, user.username);

      await redisClient.set(`session:${user.id}`, token, {
        EX: 3 * 60 * 60,
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).json({
        message: "Login successfully completed.",
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login error.", error: error.message });
    }
  },
];
