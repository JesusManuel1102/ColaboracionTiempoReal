import { Router } from "express";
import { IDependencyInjection } from "../dependencyInjection/dependencyInjection.js";
import authRouter from "@/features/auth/basic/routes/auth.router.js";

export default (container: IDependencyInjection): Router => {
  const ApplicationRouter = Router();

  ApplicationRouter.use("/auth", authRouter(container));

  return ApplicationRouter;
}
