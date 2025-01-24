import sequelize from "./database.js";
import User from "../models/user.js";
import http from "http";
import app from "../app.js";
import configureSocket from "./socket.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("sucessfully database connection.");

    await sequelize.sync({ force: false });
    console.log("Database model sync.");

    const server = http.createServer(app);

    configureSocket(server);

    const PORT = process.env.PORT;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database or server connection error:", error);
  }
};

startServer();
