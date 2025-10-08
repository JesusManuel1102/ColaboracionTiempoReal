import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { SocketManager } from "../socket-manager/SocketManager.js";
import { ItokenService } from "@repo/security/jsonwebtoken";

export const createSocketServer = (
  httpServer: HttpServer,
  tokenService: ItokenService, // Añadir tokenService como parámetro
  origins?: string[]
) => {
  const io = new Server(httpServer, {
    cors: {
      origin: origins || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  // Iniciamos nuestro SocketManager
  const socketManager = new SocketManager();

  // Evento de conexion global
  io.on("connection", async (socket) => {
    // console.log("Nuevo cliente conectado:", socket.id);

    const token = socket.handshake.auth.token; // Obtenemos el token

    if (!token) {
      console.log(`Socket ${socket.id} disconnected: No token provided`);
      socket.disconnect(true);
      return;
    }

    try {
      const decodedToken = tokenService.verifyToken(token);
      const userId = decodedToken as { userId: string };

      // Añadimos la conexion al SocketManager
      socketManager.addConnection(userId.userId, socket.id);

      socket.on("disconnect", () => {
        // Eliminamos la conexion del SocketManager
        socketManager.removeConnection(socket.id);
        // console.log("Cliente desconectado: ", socket.id);
      });
    } catch (error) {
      console.error(`Socket ${socket.id} disconnected: Invalid token`, error);
      socket.disconnect(true);
    }
  });

  return { io, socketManager };
};
