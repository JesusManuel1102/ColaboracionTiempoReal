import { UserRegisteredEvent } from "@repo/domain/auth-domain";
import {
  InMemoryEventBroker,
  UserRegisteredEventHandler,
} from "@repo/infraestructure/events";

/**
 * Registra el UserRegisteredEventHandler en el broker.
 * @param broker La instancia global del broker.
 * @param handler La instancia del manejador (con sus dependencias ya inyectadas).
 */
export function registerProfileDomainHandlers(
  broker: InMemoryEventBroker,
  handler: UserRegisteredEventHandler
) {
  const eventName = UserRegisteredEvent.EVENT_NAME;

  broker.subscribe(eventName, (event: UserRegisteredEvent) => {
    console.log(
      `[EventBus] Registered handler for event: ${UserRegisteredEvent.EVENT_NAME}`
    );
    return handler.handle(event);
  });
}
