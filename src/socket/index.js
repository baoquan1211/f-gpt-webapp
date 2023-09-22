import io from "socket.io-client";

const socket = io.connect("http://127.0.0.1:8000", {
  transports: ["websocket"],
  hostname: "127.0.0.1",
  port: 8000,
});

export { socket };
