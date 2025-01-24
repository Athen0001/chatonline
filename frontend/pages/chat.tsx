import { useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import api from "@/utils/api";

//chat page logic
export default function Chat() {
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/chat");
      } catch (error) {
        console.error("Unauthorized, redirecting to login.");
        router.push("/");
      }
    };
    checkAuth();

    const socketInstance = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
      transports: ["websocket", "polling"],
      auth: {
        token: localStorage.getItem("auth_token"),
      },
      withCredentials: true,
    });
    console.log("front connected:", process.env.NEXT_PUBLIC_API_BASE_URL);

    socketInstance.on("connect", () => {
      console.log(`User connected: ${socketInstance.id}`);
    });

    socketInstance.on("updateUserList", (userList: string[]) => {
      console.log("Update user list:", userList);
      setUsers(userList);
    });

    socketInstance.on(
      "newMessage",
      (message: { user: string; text: string }) => {
        console.log("new message received:", message);
        setMessages((prevMessages) => [
          ...prevMessages,
          `${message.user}: ${message.text}`,
        ]);
      }
    );

    socketInstance.on("messageTooLong", (alertMessage: string) => {
      alert(alertMessage);
    });

    socketInstance.on("rateLimitExceeded", (alertMessage: string) => {
      alert(alertMessage);
    });

    setSocket(socketInstance);// necessary to handleSendMessage access outside useEffect

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = (event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (newMessage.trim() !== "" && socket) {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  //page render
  return (
    <div className={styles.chatContainer}>
      <div className={styles.userList}>
        <h3>Online Users</h3>
        {users.map((user, index) => (
          <div key={index} className={styles.user}>
            {user}
          </div>
        ))}
      </div>
      <div className={styles.chatBox}>
        <h3>Chat</h3>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              {msg}
            </div>
          ))}
        </div>
        <div className={styles.sendContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write here"
            className={styles.inputText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e);
              }
            }}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
