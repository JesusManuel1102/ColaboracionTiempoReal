import { User } from "../aggregates/User.js";
import { IUserRepository } from "../repositories/IUserRepository.js";
import crypto from "node:crypto";

export interface IHashingService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export class AuthServices {
  constructor(
    private userRepository: IUserRepository,
    private hashingService: IHashingService
  ) {}

  public async register(username: string, email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await this.hashingService.hashPassword(password);
    const uuid = crypto.randomUUID();
    const newUser = User.createNew({
      uuid,
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.create(newUser);

    return newUser;
  }

  public async login(email: string, password: string) {
    // buscamos al usuario por email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found"); // Esto es un error de dominio
    }
    const isPasswordValid = await this.hashingService.comparePassword(
      password,
      user.password.toString()
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Aqui podriamos implementar evento

    return user;
  }
}
