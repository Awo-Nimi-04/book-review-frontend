import { io } from "socket.io-client";

let socket;

export const initSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("receiveMessage", (msg) => {
      console.log("New message:", msg);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  }

  return socket;
};

export const getSocket = () => socket;
