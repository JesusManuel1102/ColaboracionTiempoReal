import { EmailAddress } from "../value-objects/EmailAddress.js";
import { HashedPassword } from "../value-objects/HashedPassword.js";

export interface UserProps {
  uuid: string;
  username: string;
  email: EmailAddress;
  password: HashedPassword;
  isVerified: boolean;
  isOnline: boolean;
  apiKey?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  public static createNew({
    uuid,
    username,
    email,
    password,
  }: {
    uuid: string;
    username: string;
    email: string;
    password: string;
  }): User {
    return new User({
      uuid,
      username,
      email: EmailAddress.create(email),
      password: HashedPassword.create(password),
      isVerified: false,
      isOnline: false,
    });
  }

  public static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  // Definimos metodos de dominio
  public get uuid(): string {
    return this.props.uuid;
  }
  public get username(): string {
    return this.props.username;
  }
  public get email(): EmailAddress {
    return this.props.email;
  }
  public get password(): HashedPassword {
    return this.props.password;
  }
  public get isVerified(): boolean {
    return this.props.isVerified;
  }
  public get isOnline(): boolean {
    return this.props.isOnline;
  }

  public get apiKey(): string | undefined {
    return this.props.apiKey;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  /**
   * Marks the user as verified.
   */
  public markAsVerified(): void {
    this.props.isVerified = true;
  }

  /**
   * Marks the user as online.
   */
  public markAsOnline(): void {
    this.props.isOnline = true;
  }

  /**
   * Returns a copy of the user's properties.
   * @returns {UserProps} A copy of the user's properties.
   */
  public getProps(): UserProps {
    return { ...this.props };
  }
}
