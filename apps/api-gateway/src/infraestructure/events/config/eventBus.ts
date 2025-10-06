import { IDependencyInjection } from "@/core/dependencyInjection/dependencyInjection.js";
import { ProfileService, UserRegisteredEventHandler } from "@repo/domain/profile-domain";
import { InMemoryEventBus } from "@repo/infraestructure/events";

export async function initializeEventBus(dependencies: IDependencyInjection) {
  // Nos Aseguramos que nuestra dependencia sea del tipo correcto
  const profileService = dependencies.profileService as ProfileService;

  // Instanciamos el manejador de eventos
  const userRegisteredEventHandler = new UserRegisteredEventHandler(
    profileService
  );

  // Suscribimos el manejador al bus de eventos
  InMemoryEventBus.subscribe(
    "UserRegisteredEvent",
    userRegisteredEventHandler.handle.bind(userRegisteredEventHandler)
  );

  console.log(
    "Event bus initialized and UserRegisteredEventHandler subscribed."
  );
}
