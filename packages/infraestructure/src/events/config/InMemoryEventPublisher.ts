import { IEventPublisher, DomainEvent } from "@repo/shared/events";

/**
 * Clase que combina la lógica del Bus de Eventos (suscribe/publish)
 * y la implementación del Publicador de Eventos (IEventPublisher).
 */
export class InMemoryEventBroker implements IEventPublisher {
  // 1. Estado centralizado: Mentenemos los suscriptores dentro de la clase
  private subscribers: { [eventName: string]: Function[] } = {};

  // ----------------------------------------------------------------------
  // Métodos del Bus de Eventos (Suscripción)
  // ----------------------------------------------------------------------

  /**
   * Registra un manejador (callback) para un tipo de evento específico.
   * @param eventName El nombre estático del evento (ej: 'UserRegisteredEvent').
   * @param callback La función a ejecutar cuando el evento es publicado.
   */
  public subscribe(eventName: string, callback: Function): void {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
    console.log(`[EventBroker] Handler subscribed to: ${eventName}`);
  }

  // ----------------------------------------------------------------------
  // Método de la Interfaz IEventPublisher (Publicación)
  // ----------------------------------------------------------------------

  /**
   * Publica un evento de dominio, notificando a todos los suscriptores.
   * Implementa la interfaz IEventPublisher.
   * @param event La instancia del DomainEvent a publicar.
   */
  public async publish<T extends DomainEvent<any>>(event: T): Promise<void> {
    // Usamos el método de instancia que creaste en la clase base DomainEvent
    const eventName = (event as any).name;

    if (!eventName) {
      throw new Error(
        "Event must have a 'name' property accessible via getEventName()."
      );
    }

    console.log(`[EventBroker] Publishing event: ${eventName}`, event);

    // Llamamos al método interno de notificación
    await this.notifySubscribers(eventName, event);
  }

  // ----------------------------------------------------------------------
  // Método Interno de Notificación (Lógica del Bus)
  // ----------------------------------------------------------------------

  private async notifySubscribers(
    eventName: string,
    eventData: any
  ): Promise<void> {
    if (this.subscribers[eventName]) {
      for (const callback of this.subscribers[eventName]) {
        // Ejecutamos los manejadores de forma asíncrona
        await callback(eventData);
      }
    }
  }
}
