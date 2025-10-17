import { VotingRoom, RoomSettings, Participant } from "../aggregates/VotingRoom.js";
import { IVotingRoomRepository } from "../repositories/IVotingRoomRepository.js";
// import { IEventPublisher } from "@repo/shared/events";
import crypto from "node:crypto";

export class VotingRoomService {
  constructor(
    private votingRoomRepository: IVotingRoomRepository
    // private eventPublisher?: IEventPublisher
  ) {}

  public async createVotingRoom(
    name: string,
    description: string,
    createdBy: string,
    creatorName: string
  ) {
    try {
      const uuid = crypto.randomUUID();
      const newVotingRoom = VotingRoom.create({
        uuid,
        name,
        description,
        createdBy,
        creatorName,
      });

      await this.votingRoomRepository.create(newVotingRoom);

      // TODO: Publish an event for VotingRoomCreatedEvent

      return newVotingRoom;
    } catch (error) {
      throw new Error("Error creating voting room: " + error);
    }
  }

  public async findVotingRoomById(
    votingRoomId: string
  ): Promise<VotingRoom | null> {
    try {
      return await this.votingRoomRepository.findById(votingRoomId);
    } catch (error) {
      throw new Error("Error finding voting room by id: " + error);
    }
  }

  public async updateVotingRoom(votingRoom: VotingRoom): Promise<VotingRoom> {
    try {
      return await this.votingRoomRepository.update(votingRoom);
    } catch (error) {
      throw new Error("Error updating voting room: " + error);
    }
  }

  public async deleteVotingRoom(votingRoomId: string): Promise<void> {
    try {
      await this.votingRoomRepository.delete(votingRoomId);
    } catch (error) {
      throw new Error("Error deleting voting room: " + error);
    }
  }

  public async getAllVotingRoomByUserId(
    userId: string
  ): Promise<VotingRoom[] | null> {
    try {
      const response =
        await this.votingRoomRepository.getAllVotingRoomByUserId(userId);
      return response;
    } catch (error) {
      throw new Error("Error getting voting room by user id: " + error);
    }
  }

  public async addParticipantToVotingRoom(
    votingRoomId: string,
    participant: Participant
  ): Promise<VotingRoom | null> {
    try {
      return await this.votingRoomRepository.addParticipant(
        votingRoomId,
        participant
      );
    } catch (error) {
      throw new Error("Error adding participant to voting room: " + error);
    }
  }

  public async updateVotingRoomStatus(
    votingRoomId: string,
    newStatus: string
  ): Promise<VotingRoom | null> {
    try {
      return await this.votingRoomRepository.updateStatus(
        votingRoomId,
        newStatus
      );
    } catch (error) {
      throw new Error("Error updating voting room status: " + error);
    }
  }
}
