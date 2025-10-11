import { DomainEvent } from "../types/DomainEvent.js";

export interface IEventPublisher {
  publish<T extends DomainEvent<any>>(event: T): Promise<void>;
}
