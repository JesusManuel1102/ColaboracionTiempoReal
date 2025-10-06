import { IProfileRepository, Profile } from "@repo/domain/profile-domain";
import { ProfileDocument, ProfileModel } from "../../schemas/index.js";

function toDomain(document: ProfileDocument | null): Profile | null {
  if (!document) {
    return null;
  }

  return Profile.fromPersistence({
    uuid: document.uuid,
    userId: document.userId,
    username: document.username,
    email: document.email,
    bio: document.bio,
    avatarUrl: document.avatarUrl,
  });
}

export class MongoProfileRepository implements IProfileRepository {
  async exists(uuid: string): Promise<boolean> {
    try {
      const document = await ProfileModel.findOne({ uuid });
      return document !== null;
    } catch (error) {
      throw new Error("Error checking if profile exists");
    }
  }

  async save(profile: Profile): Promise<void> {
    try {
      const persistenceObject = {
        uuid: profile.uuid,
        userId: profile.userId,
        username: profile.username,
        email: profile.email,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
      };

      await new ProfileModel(persistenceObject).save();
    } catch (error) {
      throw new Error("Error creating profile: " + error);
    }
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    try {
      const document = await ProfileModel.findOne({ userId });
      return toDomain(document);
    } catch (error) {
      throw new Error("Error finding profile by user id");
    }
  }

  async updateByUserId(
    userId: string,
    profile: Profile
  ): Promise<Profile | null> {
    try {
      const document = await ProfileModel.findOneAndUpdate(
        { userId },
        profile,
        { new: true }
      );
      return toDomain(document);
    } catch (error) {
      throw new Error("Error updating profile by user id");
    }
  }

  async deleteByUserId(userId: string): Promise<void> {
    try {
      await ProfileModel.deleteOne({ userId });
    } catch (error) {
      throw new Error("Error deleting profile by user id");
    }
  }
}
