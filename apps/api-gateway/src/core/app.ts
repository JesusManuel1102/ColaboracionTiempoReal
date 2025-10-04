import { CorsConfig, originWhitelist } from "@/config/cors/index.js";
import { setHeaders } from "@/config/headers/index.js";
import { limiter } from "@/config/limiter/index.js";
import { createSocketServer } from "@repo/realtime/socket/server";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./errors/middleware/errorHandler.js";
import { initializeDependencyInjection } from "./dependencyInjection/dependencyInjection.js";
import { TOKEN_SECRET } from "@/constants/env/index.js";
import ApplicationRouter from "./router/router.js";

dotenv.config();

async function initApp() {
  const Application: Express = express();
  const server = http.createServer(Application);

  const container = await initializeDependencyInjection(TOKEN_SECRET!);

  // Configuraciones Globales de Express
  Application.use(helmet());
  Application.use(setHeaders);
  Application.use(CorsConfig());
  Application.use(express.json());
  Application.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Rutas
  const mainRouter = ApplicationRouter(container);
  Application.use("/api/v1", mainRouter);

  Application.use("/api/v1", (_req: Request, res: Response) => {
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
  const { io } = createSocketServer(server, originWhitelist);
  // Configuramos los events handler para el socket

  return server;
}

export default initApp();
