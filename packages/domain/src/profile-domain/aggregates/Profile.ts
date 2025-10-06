import { EmailAddress } from "../../auth-domain/index.js";
import { ProfileId } from "../value-objects/ProfileId.js";

// Profile Aggregate
export interface ProfileProps {
  uuid: ProfileId;
  userId: string; // Referencia al UUID del User en auth-domain
  username: string;
  email: EmailAddress;
  bio?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Profile {
  private constructor(private props: ProfileProps) {}

  public static createNew({
    uuid,
    userId,
    username,
    email,
    bio,
    avatarUrl,
  }: {
    uuid: string;
    userId: string;
    username: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
  }): Profile {
    const now = new Date();
    return new Profile({
      uuid: ProfileId.create(uuid),
      userId,
      username,
      email: EmailAddress.create(email),
      bio,
      avatarUrl,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: ProfileProps): Profile {
    return new Profile(props);
  }

  public getProps(): ProfileProps {
    return { ...this.props };
  }

  // Definimos metodos de dominio
  public get uuid(): ProfileId {
    return this.props.uuid;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get username(): string {
    return this.props.username;
  }

  public get email(): EmailAddress {
    return this.props.email;
  }

  public get bio(): string | undefined {
    return this.props.bio;
  }

  public get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  public updateProfile({
    bio,
    avatarUrl,
  }: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatarUrl?: string;
  }): void {
    this.props.bio = bio !== undefined ? bio : this.props.bio;
    this.props.avatarUrl =
      avatarUrl !== undefined ? avatarUrl : this.props.avatarUrl;
    this.props.updatedAt = new Date();
  }

  public updateEmail(newEmail: string): void {
    this.props.email = EmailAddress.create(newEmail);
    this.props.updatedAt = new Date();
  }

  public updateUsername(newUsername: string): void {
    this.props.username = newUsername;
    this.props.updatedAt = new Date();
  }
}
