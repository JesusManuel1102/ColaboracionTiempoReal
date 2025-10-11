import { IDependencyInjection } from "@/core/dependencyInjection/dependencyInjection.js";
import { registerProfileDomainHandlers } from "@/features/profile/events/registerEvents.js";
import { ProfileService } from "@repo/domain/profile-domain";
import { InMemoryEventBroker } from "@repo/infraestructure/events";
import { UserRegisteredEventHandler } from "@repo/infraestructure/events";
// import { InMemoryEventBus } from "@repo/infraestructure/events";

export async function initializeEventBus(
  dependencies: Partial<IDependencyInjection>
) {
  // Iniciamos nuestro broker y handlers
  const eventBroker = new InMemoryEventBroker();
  const userRegisteredEventHandler = new UserRegisteredEventHandler(
    dependencies.profileService as ProfileService
  );

  // Registramos el evento (Acoplamiento contorlado)
  registerProfileDomainHandlers(eventBroker, userRegisteredEventHandler);

  // 🚨 Retornar el broker para que el sistema de inyección de dependencias (DI) pueda usarlo 🚨
  return eventBroker;
}
