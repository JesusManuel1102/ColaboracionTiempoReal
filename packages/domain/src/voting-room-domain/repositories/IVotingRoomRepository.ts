import { VotingRoom } from "../aggregates/VotingRoom.js";
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
}