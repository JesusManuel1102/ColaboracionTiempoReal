import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

export const createSocketServer = (httpServer: HttpServer, origins?: string[]) => {
  const io = new Server(httpServer, {
    cors: {
      origin: origins || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });
  
  // Evento de conexion global
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  })

  return { io };
};

