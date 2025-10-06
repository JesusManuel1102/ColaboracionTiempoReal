import { Request, Response, NextFunction } from "express";
import { ItokenService } from "@repo/security/jsonwebtoken";

export const authenticateToken = (tokenService: ItokenService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    try {
      const decoded: any = tokenService.verifyToken(token);

      console.log("Decoded Token:", decoded.userId);

      (req as any).user = { userId: decoded.userId }; // Adjuntar userId al objeto req
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
