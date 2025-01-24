import jwt from "jsonwebtoken";
import cookie from "cookie";
import redisClient from "../config/redis.js";

const socketAuth = async (socket, next) => {
  const cookies = socket.handshake.headers.cookie;

  if (!cookies) {
    console.error("No cookies sent in WebSocket handshake.");
    return next(new Error("Authentication error, no cookies sent."));
  }

  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies["auth_token"];

  if (!token) {
    console.error("No token found in cookies.");
    return next(new Error("No token found in cookies, auth failed."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("WebSocket authenticated user:", decoded);

    const storedToken = await redisClient.get(`session:${decoded.id}`);
    if (!storedToken || storedToken !== token) {
      return next(new Error("Session expired or invalid."));
    }
    socket.user = decoded;
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Unauthorized"));
  }
};

export default socketAuth;
