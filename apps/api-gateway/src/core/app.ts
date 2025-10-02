import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { setHeaders } from "@/config/headers/index.ts";
import { CorsConfig } from "@/config/cors/index.ts";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./errors/middleware/errorHandler.ts";
import { limiter } from "@/config/limiter/index.ts";
import { createSocketServer } from "@repo/realtime/socket/server";
import http from "http";

dotenv.config();

async function initApp() {
  const Application: Express = express();
  const server = http.createServer(Application);

  // Configuraciones Globales de Express
  Application.use(helmet());
  Application.use(setHeaders);
  Application.use(CorsConfig());
  Application.use(express.json());
  Application.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Rutas
  Application.use("/api", (req: Request, res: Response) => {
    res.send("Hola desde mi api en node.js");
  });

  // Limitamos las peticiones a nuestros endpoints
  Application.use(limiter);

  // Middleware para rutas no encontradas (debe ir antes del error handler)
  Application.use(notFoundHandler);

  // Middleware global de manejo de errores (DEBE SER EL ÚLTIMO)
  Application.use(globalErrorHandler);

  // Configuracion extra
  Application.disable("x-powered-by");

  // Configuración de Socket.IO
  const { io } = createSocketServer(server);
  // Configuramos los events handler para el socket

  return server;
}

export default initApp();
