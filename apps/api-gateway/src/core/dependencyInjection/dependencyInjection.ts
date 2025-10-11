import { TOKEN_SECRET } from "@/constants/env/index.js";
import dbInstance from "@/infraestructure/mongodb/config/index.js";
import {
  AuthServices,
  IHashingService,
  IUserRepository,
} from "@repo/domain/auth-domain";
import {
  IProfileRepository,
  ProfileService,
} from "@repo/domain/profile-domain";
import {
  MongoProfileRepository,
  MongoUserRepository,
  MongoVotingRoomRepository,
} from "@repo/infraestructure/mongodb";
import { BcryptHashingService } from "@repo/security/hashing";
import { ItokenService, JwtTokenService } from "@repo/security/jsonwebtoken";
import { IEventPublisher } from "@repo/shared/events";
import { initializeEventBus } from "@/infraestructure/events/index.js";
import { IVotingRoomRepository, VotingRoomService } from "@repo/domain/voting-room-domain";

export interface IDependencyInjection {
  authServices: AuthServices;
  tokenService: ItokenService;
  profileService: ProfileService;
  votingRoomService: VotingRoomService;
}

export async function initializeDependencyInjection() {
  // 1. CONEXIÓN A INFRAESTRUCTURA
  await dbInstance.connect();

  // 2. REPOSITORIOS (Implementaciones de Infraestructura)
  // Se definen primero porque son inyectados en los servicios de dominio.
  const repositories = {
    userRepository: new MongoUserRepository() as IUserRepository,
    profileRepository: new MongoProfileRepository() as IProfileRepository,
    votingRoomRepository: new MongoVotingRoomRepository() as IVotingRoomRepository,
  };

  // 3. SERVICIOS DE UTILIDAD (Hashing, Tokens)
  const utilityServices = {
    tokenService: new JwtTokenService(TOKEN_SECRET!) as ItokenService,
    hashingService: new BcryptHashingService() as IHashingService,
  };

  // 4. SERVICIOS DE DOMINIO - ETAPA 1 (Inicialización para Eventos)
  const profileService = new ProfileService(repositories.profileRepository);
  const votingRoomService = new VotingRoomService(repositories.votingRoomRepository);

  // 5. INICIALIZAR EVENT BUS Y REGISTRAR HANDLERS
  // El Event Bus necesita el ProfileService para inyectarlo en sus Handlers.
  const eventPublisher: IEventPublisher = await initializeEventBus({
    profileService,
  });

  // 6. SERVICIOS DE DOMINIO - ETAPA 2 (Inyección Final)
  // El AuthServices requiere todas sus dependencias, incluyendo el EventPublisher.
  const authServices = new AuthServices(
    repositories.userRepository,
    utilityServices.hashingService,
    eventPublisher // 👈 ¡Inyección completada!
  );

  return {
    // Servicios
    authServices,
    profileService,
    votingRoomService,
    // Eventos
    eventPublisher,
    // Utilidades
    tokenService: utilityServices.tokenService,
  };
}
