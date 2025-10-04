import { IHashingService } from '@repo/domain/auth-domain';
import bcrypt from 'bcrypt';

export class BcryptHashingService implements IHashingService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}