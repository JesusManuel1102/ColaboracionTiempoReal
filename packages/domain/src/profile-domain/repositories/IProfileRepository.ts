import { Profile } from "../aggregates/Profile.js";

export interface IProfileRepository {
  exists(profileId: string): Promise<boolean>;
  save(profile: Profile): Promise<void>;
  findByUserId(userId: string): Promise<Profile | null>;
  updateByUserId(userId: string, profile: Profile): Promise<Profile | null>;
  deleteByUserId(userId: string): Promise<void>;
}
