import { Server } from "socket.io";
import socketAuth from "../middlewares/socketAuth.js";
import chatController from "../controllers/chatController.js";

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONT_API,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connect", (socket) => {
    chatController(io, socket);
  });

  return io;
};

export default configureSocket;
