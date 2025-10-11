import { Request, Response } from "express";
import { VotingRoomService } from "@repo/domain/voting-room-domain";

export class VotingRoomController {
  constructor(private votingRoomService: VotingRoomService) { }
  
  public async createVotingRoom(req: Request, res: Response): Promise<void> {
    const { name, description, createdBy, creatorName } = req.body;
    const votingRoom = await this.votingRoomService.createVotingRoom(
      name,
      description,
      createdBy,
      creatorName
    );
    if (!votingRoom) {
      res.status(404).json({ message: "Voting Room not found" });
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
    const votingRoom = await this.votingRoomService.findVotingRoomById(votingRoomId!);
    if (!votingRoom) {
      res.status(404).json({ message: "Voting Room not found" });
    }
    res.status(200).json({
      votingRoomId: votingRoom?.getProps().uuid,
      accessCode: votingRoom?.getProps().codeInvitation,
      name: votingRoom?.getProps().name,
      description: votingRoom?.getProps().description,
    });
  }

  // public async getVotingRoomByUserId(req: Request, res: Response): Promise<void> {
  //   const { userId } = (req as any).user;

  //   if (!userId) {
  //     res.status(401).json({ message: "User ID not found" });
  //   }
  //   console.log("User ID:", userId);

  //   const votingRoom = await this.votingRoomService.getVotingRoomByUserId(userId!);
  //   console.log("Voting Room:", votingRoom);

  //   if (!votingRoom) {
  //     res.status(404).json({ message: "Voting Room not found" });
  //   }

  //   res.status(200).json({
  //     votingRoomId: votingRoom?.getProps().votingRoomId,
  //     accessCode: votingRoom?.getProps().accessCode,
  //     name: votingRoom?.getProps().name,
  //     description: votingRoom?.getProps().description,
  //     startTime: votingRoom?.getProps().startTime,
  //     endTime: votingRoom?.getProps().endTime,
  //   });
  // }

  // public async deleteVotingRoom(req: Request, res: Response): Promise<void> {
  //   const { votingRoomId } = req.params;
  //   await this.votingRoomService.deleteVotingRoom(votingRoomId!);
  //   res.status(204).send();
  // }

}
