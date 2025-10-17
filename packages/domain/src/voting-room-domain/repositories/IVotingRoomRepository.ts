import { VotingRoom, Participant } from "../aggregates/VotingRoom.js";
import { VotingRoomId } from "../value-objects/VotingRoomId.js";

/**
 * @interface IVotingRoomRepository
 * @description Defines the contract for interacting with voting room data.
 */
export interface IVotingRoomRepository {
  /**
   * @method create
   * @description Creates a new voting room.
   * @param votingRoom - The voting room to create.
   * @returns A promise that resolves to the created voting room.
   */
  create(votingRoom: VotingRoom): Promise<VotingRoomId>;

  /**
   * @method findById
   * @description Finds a voting room by its ID.
   * @param votingRoomId - The ID of the voting room to find.
   * @returns A promise that resolves to the found voting room, or null if not found.
   */
  findById(votingRoomId: string): Promise<VotingRoom | null>;

  /**
   * @method update
   * @description Updates an existing voting room.
   * @param votingRoom - The voting room to update.
   * @returns A promise that resolves to the updated voting room.
   */
  update(votingRoom: VotingRoom): Promise<VotingRoom>;

  /**
   * @method delete
   * @description Deletes a voting room.
   * @param votingRoomId - The ID of the voting room to delete.
   * @returns A promise that resolves when the voting room is deleted.
   */
  delete(votingRoomId: string): Promise<void>;

  /**
   * @method getAllVotingRoomByUserId
   * @description Retrieves all voting rooms associated with a specific user.
   * @param userId - The ID of the user whose voting rooms are to be retrieved.
   * @returns A promise that resolves to an array of voting rooms, or null if none are found.
   */
  // getAllVotingRoomByUserId(userId: string): Promise<VotingRoom[] | null>;
  getAllVotingRoomByUserId(userId: string): Promise<VotingRoom[] | null>;

  /**
   * @method addParticipant
   * @description Adds a participant to a voting room.
   * @param votingRoomId - The ID of the voting room.
   * @param participant - The participant object to add.
   * @returns A promise that resolves to the updated voting room, or null if not found.
   */
  addParticipant(
    votingRoomId: string,
    participant: Participant
  ): Promise<VotingRoom | null>;

  /**
   * @method updateStatus
   * @description Updates the status of a voting room.
   * @param votingRoomId - The ID of the voting room.
   * @param newStatus - The new status to set for the voting room.
   * @returns A promise that resolves to the updated voting room, or null if not found.
   */
  updateStatus(
    votingRoomId: string,
    newStatus: string
  ): Promise<VotingRoom | null>;
}
