import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "access token not found." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const storedToken = await redisClient.get(`session:${decoded.id}`);
    if (!storedToken || storedToken !== token) {
      return res.status(401).json({ message: "Session expired or invalid." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "unauthorized access." });
  }
};

export default authenticate;
