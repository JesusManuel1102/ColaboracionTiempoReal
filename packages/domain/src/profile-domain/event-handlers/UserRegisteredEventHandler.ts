import { UserRegisteredEvent } from "@repo/domain/auth-domain";
import { ProfileService } from "../services/ProfileService.js";

export class UserRegisteredEventHandler {
  constructor(private profileService: ProfileService) {}

  public async handle(event: UserRegisteredEvent) {
    console.log("UserRegisteredEvent received:", event);
    // Aquí se crearía el perfil de usuario utilizando ProfileService
    await this.profileService.createProfile(
      event.userId,
      event.username,
      event.email,
    );
    console.log(`Profile created for user ${event.username}`);
  }
}
