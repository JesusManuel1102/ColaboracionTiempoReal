import { DomainEvent } from "@repo/shared/events";

export interface UserRegisteredEventPayload {
  userId: string;
  username: string;
  email: string;
}


export class UserRegisteredEvent extends DomainEvent<UserRegisteredEventPayload> {
  static readonly EVENT_NAME = "UserRegisteredEvent";

  constructor(payload: UserRegisteredEventPayload) {
    super(UserRegisteredEvent.EVENT_NAME, payload);
  }
}