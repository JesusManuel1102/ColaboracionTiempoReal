export abstract class DomainEvent<T> {
  public readonly name: string;
  public readonly payload: T;
  public readonly occurredOn: Date;

  constructor(name: string, payload: T) {
    this.name = name;
    this.payload = payload;
    this.occurredOn = new Date();
  }

  public getEventName(): string {
    return this.name;
  }
}
