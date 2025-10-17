import { Request, Response } from "express";
import { VotingRoomService } from "@repo/domain/voting-room-domain";

export class VotingRoomController {
  constructor(private votingRoomService: VotingRoomService) {}

  public async createVotingRoom(req: Request, res: Response): Promise<void> {
    const { name, description, createdBy, creatorName } = req.body;
    const votingRoom = await this.votingRoomService.createVotingRoom(
      name,
      description,
      createdBy,
      creatorName
    );
    if (!votingRoom) {
      throw new Error("Voting Room not found");
    }
    res.status(200).json({
      votingRoomId: votingRoom?.getProps().uuid,
      accessCode: votingRoom?.getProps().codeInvitation,
      name: votingRoom?.getProps().name,
      description: votingRoom?.getProps().description,
    });
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { votingRoomId } = req.params;
    const votingRoom = await this.votingRoomService.findVotingRoomById(
      votingRoomId!
    );
    if (!votingRoom) {
      throw new Error("Voting Room not found");
    }
    res.status(200).json({
      votingRoomId: votingRoom?.getProps().uuid,
      accessCode: votingRoom?.getProps().codeInvitation,
      name: votingRoom?.getProps().name,
      description: votingRoom?.getProps().description,
      status: votingRoom?.getProps().votingRoomStatus,
      participants: votingRoom?.getProps().participants,
    });
  }

  public async addParticipantToVotingRoom(
    req: Request,
    res: Response
  ): Promise<void> {
    const { votingRoomId } = req.params;
    const { participant } = req.body;

    const updatedVotingRoom =
      await this.votingRoomService.addParticipantToVotingRoom(
        votingRoomId!,
        participant
      );

    if (!updatedVotingRoom) {
      throw new Error("Voting Room not found");
    }

    res.status(200).json({
      votingRoomId: updatedVotingRoom?.getProps().uuid,
      accessCode: updatedVotingRoom?.getProps().codeInvitation,
      name: updatedVotingRoom?.getProps().name,
      description: updatedVotingRoom?.getProps().description,
      status: updatedVotingRoom?.getProps().votingRoomStatus,
      participants: updatedVotingRoom?.getProps().participants,
    });
  }

  public async updateVotingRoomStatus(
    req: Request,
    res: Response
  ): Promise<void> {
    const { votingRoomId } = req.params;
    const { newStatus } = req.body;

    const updatedVotingRoom =
      await this.votingRoomService.updateVotingRoomStatus(
        votingRoomId!,
        newStatus
      );

    if (!updatedVotingRoom) {
      throw new Error("Voting Room not found");
    }

    res.status(200).json({
      votingRoomId: updatedVotingRoom?.getProps().uuid,
      accessCode: updatedVotingRoom?.getProps().codeInvitation,
      name: updatedVotingRoom?.getProps().name,
      description: updatedVotingRoom?.getProps().description,
      status: updatedVotingRoom?.getProps().votingRoomStatus,
      participants: updatedVotingRoom?.getProps().participants,
    });
  }

  public async getAllVotingRoomByUserId(
    req: Request,
    res: Response
  ): Promise<void> {
    const { userId } = (req as any).user;

    if (!userId) {
      throw new Error("User ID not found");
    }

    const votingRooms = await this.votingRoomService.getAllVotingRoomByUserId(
      userId!
    );

    res.status(200).json(votingRooms);
  }
}
