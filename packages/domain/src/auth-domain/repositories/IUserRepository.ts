import { User } from "../aggregates/User.js";

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByUuid(uuid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}