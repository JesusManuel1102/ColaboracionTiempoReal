import dbInstance from "@/infraestructure/mongodb/config/index.js";
import {
  AuthServices,
  IHashingService,
  IUserRepository,
  IEventPublisher,
} from "@repo/domain/auth-domain";
import { InMemoryEventPublisher } from "@repo/infraestructure/events";
import {
  MongoProfileRepository,
  MongoUserRepository,
} from "@repo/infraestructure/mongodb";
import { ItokenService, JwtTokenService } from "@repo/security/jsonwebtoken";
import { BcryptHashingService } from "@repo/security/hashing";
import {
  IProfileRepository,
  ProfileService,
} from "@repo/domain/profile-domain";

export interface IDependencyInjection {
  authServices: AuthServices;
  tokenService: ItokenService;
  profileService: ProfileService;
  eventPublisher: IEventPublisher;
  // hashingService: IHashingService;
}

export async function initializeDependencyInjection(jwtSecret: string) {
  // Iniciamos la coneccion a la base de datos
  await dbInstance.connect();

  // Definimos los repositorios
  const userRepository: IUserRepository = new MongoUserRepository();
  const profileRepository: IProfileRepository = new MongoProfileRepository();

  // Definimos los servicios e Inyectamos las dependencias
  const tokenService: ItokenService = new JwtTokenService(jwtSecret);
  const hashingService: IHashingService = new BcryptHashingService();
  const eventPublisher: IEventPublisher = new InMemoryEventPublisher();

  // Servicios por funcionalidades
  const profileService: ProfileService = new ProfileService(profileRepository);
  const authServices = new AuthServices(
    userRepository,
    hashingService,
    eventPublisher
  );

  return {
    authServices,
    tokenService,
    profileService,
    eventPublisher,
  };
}
