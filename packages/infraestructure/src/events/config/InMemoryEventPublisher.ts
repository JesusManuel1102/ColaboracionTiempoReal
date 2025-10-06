import { IEventPublisher } from "@repo/domain/auth-domain";

// En un entorno real, esto sería un Message Broker como RabbitMQ o Kafka.
// Para este ejemplo, usaremos un simple array en memoria.
const subscribers: { [eventName: string]: Function[] } = {};

export const InMemoryEventBus = {
  subscribe: (eventName: string, callback: Function) => {
    if (!subscribers[eventName]) {
      subscribers[eventName] = [];
    }
    subscribers[eventName].push(callback);
  },
  publish: async (eventName: string, eventData: any) => {
    if (subscribers[eventName]) {
      for (const callback of subscribers[eventName]) {
        await callback(eventData);
      }
    }
  },
};

export class InMemoryEventPublisher implements IEventPublisher {
  async publish(event: any): Promise<void> {
    // Asumimos que el evento tiene una propiedad 'type' para identificarlo
    if (!event.type) {
      throw new Error("Event must have a 'type' property.");
    }
    console.log(`Publishing event: ${event.type}`, event);
    await InMemoryEventBus.publish(event.type, event);
  }
}
