import { Profile } from "../aggregates/Profile.js";
import { IProfileRepository } from "../repositories/IProfileRepository.js";
import { ProfileId } from "../value-objects/ProfileId.js";

export class ProfileService {
  constructor(private profileRepository: IProfileRepository) {}

  public async createProfile(
    userId: string,
    username: string,
    email: string,
  ): Promise<Profile> {
    const existingProfile = await this.profileRepository.exists(userId);
    if (existingProfile) {
      throw new Error("Profile already exists for this user.");
    }

    const profile = Profile.createNew({
      uuid: ProfileId.create().toString(),
      userId,
      username,
      email,
      bio: "",
      avatarUrl: "",
    });

    await this.profileRepository.save(profile);
    return profile;
  }

  public async updateProfile(
    userId: string,
    bio?: string,
    avatarUrl?: string
  ): Promise<Profile | null> {
    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new Error("Profile not found.");
    }

    profile.updateProfile({
      bio,
      avatarUrl,
    });

    await this.profileRepository.updateByUserId(userId, profile);
    return profile;
  }

  public async getProfileByUserId(userId: string): Promise<Profile | null> {
    return await this.profileRepository.findByUserId(userId);
  }

  public async deleteProfile(userId: string): Promise<void> {
    await this.profileRepository.deleteByUserId(userId);
  }
}
