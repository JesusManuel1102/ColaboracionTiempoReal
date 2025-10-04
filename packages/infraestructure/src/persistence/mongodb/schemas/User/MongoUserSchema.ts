import { Document, model, Schema } from "mongoose";
import { UserProps } from "@repo/domain/auth-domain";

export interface UserDocument
  extends Omit<UserProps, "email" | "password">,
    Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<UserDocument>("Users", UserSchema);
