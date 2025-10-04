import { Request, Response } from 'express'
import { ItokenService } from "@repo/security/jsonwebtoken";
import { AuthServices } from '@repo/domain/auth-domain';

export class AuthController {
  constructor(
    private authService: AuthServices,
    private tokenService: ItokenService,
  ) {}

  public async register(req: Request, res: Response): Promise<void> {

    const { username, email, password } = req.body;

    const user = await this.authService.register(username as string, email as string, password as string);
    
    const token = this.tokenService.generateToken({
      userId: user.uuid,
    }, '1d');

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const user = await this.authService.login(email as string, password as string);

    const token = this.tokenService.generateToken({
      userId: user.uuid,
    }, '1d');

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  }
}