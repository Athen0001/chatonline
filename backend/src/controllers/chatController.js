let onlineUsers = {};
const messageRateLimit = {};

const chatController = (io, socket) => {
  console.log(`User connected: ${socket.id}`);

  onlineUsers[socket.id] = socket.user.username;
  console.log(`${socket.user.username} is online.`);
  io.emit("updateUserList", Object.values(onlineUsers));

  const userId = socket.user.id;
  if (!messageRateLimit[userId]) {
    messageRateLimit[userId] = { count: 0, timer: null };
  }

  socket.on("sendMessage", (message) => {
    if (message.length > 560) {
      console.log(`Message from user ${userId} exceed length limit.`);
      socket.emit(
        "messageTooLong",
        "Your message is too long."
      );
      return;
    }

    const userRate = messageRateLimit[userId];
    userRate.count++;

    if (userRate.count > 1) {
      console.log(`User ${userId} exceed rate limit.`);
      socket.emit("rateLimitExceeded", "You are sending messages too fast.");
      return;
    }

    if (!userRate.timer) {
      userRate.timer = setTimeout(() => {
        userRate.count = 0;
        userRate.timer = null;
      }, 1000);
    }

    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    io.emit("newMessage", {
      user: socket.user.username,
      text: sanitizedMessage,
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete onlineUsers[socket.id];
    delete messageRateLimit[userId];
    io.emit("updateUserList", Object.values(onlineUsers));
  });
};

export default chatController;
