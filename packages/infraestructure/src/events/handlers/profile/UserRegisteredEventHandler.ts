import { UserRegisteredEvent } from "@repo/domain/auth-domain";
import { ProfileService } from "@repo/domain/profile-domain";
import { IEventHandler } from "@repo/shared/events";

export class UserRegisteredEventHandler
  implements IEventHandler<UserRegisteredEvent>
{
  constructor(private readonly profileService: ProfileService) {}

  async handle(event: UserRegisteredEvent): Promise<void> {
    console.log(
      `[ProfileDomain] Handling UserRegisteredEvent for user: ${event.payload.username}`
    );
    const { userId, email, username } = event.payload;

    try {
      // Lógica específica del dominio de Perfiles para crear un perfil
      await this.profileService.createProfile(userId, username, email);
      console.log(
        `[ProfileDomain] Profile created successfully for user: ${username}`
      );
    } catch (error) {
      console.error(
        `[ProfileDomain] Error creating profile for user ${username}:`,
        error
      );
    }
  }
}
