import io from "socket.io-client";

const socket = io.connect(`https://${import.meta.env.VITE_SERVER_URL}`, {
  transports: ["websocket"],
  hostname: "127.0.0.1",
  port: 8000,
});

export { socket };
