import {
  IVotingRoomRepository,
  VotingRoom,
  VotingRoomId,
} from "@repo/domain/voting-room-domain";
import { VotingRoomDocument, VotingRoomModel } from "../../schemas/VotingRoom/MongoVotingRoomSchema.js";

function toDomain(document: VotingRoomDocument | null): VotingRoom | null {
  if (!document) {
    return null;
  }
  return VotingRoom.fromPersistence(document.toObject());
}

export class MongoVotingRoomRepository implements IVotingRoomRepository {
  async create(votingRoom: VotingRoom): Promise<VotingRoomId> {
    try {
      const newVotingRoom = new VotingRoomModel(votingRoom.getProps());
      await newVotingRoom.save();
      return votingRoom.uuid;
    } catch (error) {
      throw new Error("Error creating voting room: " + error);
    }
  }

  async findById(votingRoomId: string): Promise<VotingRoom | null> {
    try {
      const votingRoomDocument = await VotingRoomModel.findOne({
        uuid: votingRoomId,
      }).exec();
      return toDomain(votingRoomDocument);
    } catch (error) {
      throw new Error("Error finding voting room by id: " + error);
    }
  }

  async update(votingRoom: VotingRoom): Promise<VotingRoom> {
    try {
      const updatedVotingRoom = await VotingRoomModel.findOneAndUpdate(
        { uuid: votingRoom.uuid.toString() },
        votingRoom.getProps(),
        { new: true }
      ).exec();

      if (!updatedVotingRoom) {
        throw new Error(
          `VotingRoom with uuid ${votingRoom.uuid.toString()} not found.`
        );
      }
      const domainVotingRoom = toDomain(updatedVotingRoom);
      if (!domainVotingRoom) {
        throw new Error("Error converting updated voting room to domain object.");
      }
      return domainVotingRoom;
    } catch (error) {
      throw new Error("Error updating voting room: " + error);
    }
  }

  async delete(votingRoomId: string): Promise<void> {
    try {
      const result = await VotingRoomModel.deleteOne({
        uuid: votingRoomId,
      }).exec();
      if (result.deletedCount === 0) {
        throw new Error(`VotingRoom with uuid ${votingRoomId} not found.`);
      }
    } catch (error) {
      throw new Error("Error deleting voting room: " + error);
    }
  }
}
