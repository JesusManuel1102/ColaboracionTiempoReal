import { model, Schema } from "mongoose";
import { ProfileProps } from "@repo/domain/profile-domain";

export interface ProfileDocument extends ProfileProps {}

const ProfileSchema = new Schema<ProfileDocument>(
  {
    uuid: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProfileModel = model<ProfileDocument>("Profiles", ProfileSchema);
