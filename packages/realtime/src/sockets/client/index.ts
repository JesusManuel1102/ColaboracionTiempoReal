import { io, Socket } from "socket.io-client";

export const createSocketClient = (origin: string): Socket => {
  return io(origin, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnection: true,
  });
}