import dbInstance from "@/infraestructure/mongodb/config/index.js";
import { AuthServices, IHashingService, IUserRepository } from "@repo/domain/auth-domain";
import { MongoUserRepository } from "@repo/infraestructure/mongodb";
import { ItokenService, JwtTokenService } from "@repo/security/jsonwebtoken";
import { BcryptHashingService } from "@repo/security/hashing";

export interface IDependencyInjection {
  authServices: AuthServices;
  tokenService: ItokenService;
  // hashingService: IHashingService;
}

export async function initializeDependencyInjection(jwtSecret: string) {

  // Iniciamos la coneccion a la base de datos
  await dbInstance.connect();

  // Inyectamos las dependencias
  const tokenService: ItokenService = new JwtTokenService(jwtSecret);
  const hashingService: IHashingService = new BcryptHashingService();
  const userRepository: IUserRepository = new MongoUserRepository();

  // Inyectamos las dependencias en el AuthServices
  const authServices = new AuthServices(
    userRepository,
    hashingService,
  );

  return {
    authServices,
    tokenService,
  }
}