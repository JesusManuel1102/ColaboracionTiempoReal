import { UserRegisteredEvent } from "@repo/domain/auth-domain";
import {
  InMemoryEventBroker,
  UserRegisteredEventHandler,
} from "@repo/infraestructure/events";

/**
 * Registers the UserRegisteredEventHandler with the broker.
 * @param broker The global broker instance.
 * @param handler The handler instance (with its dependencies already injected).
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
