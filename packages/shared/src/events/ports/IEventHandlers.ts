import { DomainEvent } from "../types/DomainEvent.js";

export interface IEventHandler<T extends DomainEvent<any>> {
  handle(event: T): Promise<void>;
}
