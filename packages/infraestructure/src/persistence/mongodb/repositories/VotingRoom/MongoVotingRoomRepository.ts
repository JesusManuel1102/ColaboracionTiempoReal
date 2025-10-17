import {
  IVotingRoomRepository,
  Participant,
  VotingRoom,
  VotingRoomId,
  VotingRoomProps,
} from "@repo/domain/voting-room-domain";
import {
  VotingRoomModel,
} from "../../schemas/VotingRoom/MongoVotingRoomSchema.js";

function toDomain(document: VotingRoomProps | null): VotingRoom | null {
  if (!document) {
    return null;
  }

  // 🔹 Ahora sí pasamos un objeto plano al dominio
  return VotingRoom.fromPersistence(document);
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
      const votingRoomDocument = await VotingRoomModel.findOne({ uuid: votingRoomId }).lean().exec();
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
        { new: true, lean: true }
      ).exec();

      if (!updatedVotingRoom) {
        throw new Error(
          `VotingRoom with uuid ${votingRoom.uuid.toString()} not found.`
        );
      }
      const domainVotingRoom = toDomain(updatedVotingRoom);
      if (!domainVotingRoom) {
        throw new Error(
          "Error converting updated voting room to domain object."
        );
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

  async getAllVotingRoomByUserId(userId: string): Promise<VotingRoom[] | null> {
    try {
      const votingRoomDocuments = await VotingRoomModel.find({ createdBy: userId })
        .select("-_id -__v -createdAt -updatedAt")
        .lean()
        .exec();
      return votingRoomDocuments.map(doc => toDomain(doc)).filter(Boolean) as VotingRoom[];
    } catch (error) {
      throw new Error("Error getting voting room by user id: " + error);
    }
  }

  /**
   * Adds a participant to a voting room.
   * @param votingRoomId - The ID of the voting room.
   * @param participantId - The ID of the participant to add.
   * @returns The updated VotingRoom domain object, or null if not found.
   */
  async addParticipant(
    votingRoomId: string,
    participant: Participant
  ): Promise<VotingRoom | null> {
    try {
      const updatedVotingRoom = await VotingRoomModel.findOneAndUpdate(
        { uuid: votingRoomId },
        { $addToSet: { participants: participant } }, // Correctly add participant as an object
        { new: true, lean: true }
      ).exec();

      if (!updatedVotingRoom) {
        throw new Error(`VotingRoom with uuid ${votingRoomId} not found.`);
      }
      const domainVotingRoom = toDomain(updatedVotingRoom);
      if (!domainVotingRoom) {
        throw new Error("Error converting updated voting room to domain object.");
      }
      return domainVotingRoom;
    } catch (error) {
      throw new Error("Error adding participant to voting room: " + error);
    }
  }

  /**
   * Updates the status of a voting room.
   * @param votingRoomId - The ID of the voting room.
   * @param newStatus - The new status to set for the voting room.
   * @returns The updated VotingRoom domain object, or null if not found.
   */
  async updateStatus(
    votingRoomId: string,
    newStatus: string
  ): Promise<VotingRoom | null> {
    try {
      const updatedVotingRoom = await VotingRoomModel.findOneAndUpdate(
        { uuid: votingRoomId },
        { votingRoomStatus: newStatus }, // Use 'votingRoomStatus' as per schema
        { new: true, lean: true }
      ).exec();

      if (!updatedVotingRoom) {
        throw new Error(`VotingRoom with uuid ${votingRoomId} not found.`);
      }
      const domainVotingRoom = toDomain(updatedVotingRoom);
      if (!domainVotingRoom) {
        throw new Error("Error converting updated voting room to domain object.");
      }
      return domainVotingRoom;
    } catch (error) {
      throw new Error("Error updating voting room status: " + error);
    }
  }
}
