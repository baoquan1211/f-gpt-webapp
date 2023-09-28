import io from "socket.io-client";

const socket = io.connect(`${import.meta.env.VITE_SERVER_URL}`, {
  transports: ["websocket"],
});

export { socket };
