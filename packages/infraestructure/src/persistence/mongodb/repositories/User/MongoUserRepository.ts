import {
  IUserRepository,
  User as DomainUser,
  EmailAddress,
  HashedPassword,
} from "@repo/domain/auth-domain";
import { UserDocument, UserModel } from "../../schemas/index.js";

function toDomain(document: UserDocument | null): DomainUser | null {
  if (!document) {
    return null;
  }

  return DomainUser.fromPersistence({
    uuid: document.uuid,
    username: document.username,
    email: EmailAddress.create(document.email),
    password: HashedPassword.create(document.password),
    isVerified: document.isVerified,
    isOnline: document.isOnline,
  });
}

export class MongoUserRepository implements IUserRepository {
  async findByUuid(uuid: string): Promise<DomainUser | null> {
    try {
      const document = await UserModel.findOne({ uuid });
      return toDomain(document);
    } catch (error) {
      throw new Error("Error finding user by uuid");
    }
  }
  
  async findByEmail(email: string): Promise<DomainUser | null> {
    try {
      const document = await UserModel.findOne({ email });
      return toDomain(document);
    } catch (error) {
      throw new Error("Error finding user by email");
    }
  }
  
  async create(user: DomainUser): Promise<void> {
    try {
      const persistenceObject = {
        uuid: user.uuid,
        username: user.username,
        email: user.email.toString(),
        password: user.password.toString(),
        isVerified: user.isVerified,
        isOnline: user.isOnline,
      };

      await UserModel.findByIdAndUpdate({ uuid: user.uuid }, persistenceObject, {
        upsert: true,
        new: true,
      }).lean().exec();
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
}
