import jwt from 'jsonwebtoken';

export interface ItokenService {
  generateToken(payload: object, expiresTime?: string | number): string;
  verifyToken(token: string): object | string | null;
}

export class JwtTokenService implements ItokenService {
  private readonly SECRET_KEY: string;

  constructor(secretKey: string) {
    if (!secretKey) {
      throw new Error('Secret key is required');
    }
    this.SECRET_KEY = secretKey;
  }

  generateToken(payload: object, expiresTime: string | number = '1d'): string {
    return jwt.sign(payload!, this.SECRET_KEY, { expiresIn: expiresTime } as jwt.SignOptions);
  }

  verifyToken(token: string): object | string | null {
    try {
      return jwt.verify(token, this.SECRET_KEY) as object;
    } catch (error) {
      throw new Error('Invalid or expired');
    }
  }
}